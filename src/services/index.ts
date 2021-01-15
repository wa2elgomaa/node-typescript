// import core modules
import fetch from "node-fetch";
import format from "string-format";
import { Response, Request } from "express";
// import types from express
import ServerResponse from '../models/ServerResponse';
import GitHubInput from '../models/GitHubInput';
import FetchResponse from '../models/FetchResponse';
import URLS from '../configs/constants.urls';
import DBClient from '../clients/redis/redisCRUD';
import Utils from '../utils';

const getRedisKey = (type : string, text: string) => {
    const redisKey = `${type}:${text}`
    return redisKey;
}
const getFromAPI = (req : Request, res: Response) => {
    let { text, type } = req.body;
    // stored key 
    const redisKey = getRedisKey(type, text);

    fetch(format(URLS.searchAPI, type, text))
        .then((response : FetchResponse)  => response.json())
        .then((data: GitHubInput) => {
            // cleanify the data before saving it 
            let cleanData =  Utils.dataMapper.getCleanData(type, data);
            // cache data
            // client.setex(redisKey, DB_DATA_EXPRIE , JSON.stringify(data))
            DBClient.save(redisKey, cleanData).then((response : ServerResponse) => {
                if (response.status == 200) {
                    console.info("New record inserted under : ", redisKey);
                } else {
                    console.info("Inserting new record has faild for : ", redisKey);
                }
            }).catch((ex : Error) => {
                console.error("Inserting new record has exception for : ", ex);
            });
            // return result to client in both cases of insertion success of faluire
            return res.status(200).json(Utils.formattedResponse("Live data loaded successfully" , 200 , cleanData));
        })
        .catch((ex : Error) => {
            console.error("Error when query from live API, error : ", ex.message);
            return res.status(500).json(Utils.formattedResponse(ex.message , 500));
        });
}
const getData = (req: Request, res: Response) => {
    let { text, type } = req.body;
    if(text && type){
        // stored key 
        const redisKey = getRedisKey(type, text);
        try {
            // fetching results first from redis using the key  
            return DBClient.select(redisKey).then((response : ServerResponse) => {
                if (response.status == 200) {
                    return res.status(200).json(Utils.formattedResponse("Cached data loaded successfully" , 200 , response.results));
                } else {
                    //else get from API
                    return getFromAPI(req, res);
                }
            }).catch((ex : ServerResponse) => {
                // log the error
                console.error("Error when getting items", ex.statusText);
                // if the redis client failed to connect fallback to live call 
                return getFromAPI(req, res);
            });
        }catch(ex){
            return res.status(500).json(Utils.formattedResponse(ex.message , 500));
        }
    }else {
        return res.status(500).json(Utils.formattedResponse("Type & Text parameters is required" , 500));
    }
}
const clearCache = (req: Request, res : Response) => {
    DBClient.remove().then((successResponse : ServerResponse) => {
        return res.status(successResponse.status).json(successResponse);
    }).catch((errorResponse : ServerResponse) => {
        // log the error
        console.error("Error when clearing the cache :", errorResponse.statusText);
        // if the redis client failed to connect fallback to live call 
        return res.status(500).json(errorResponse);
    });
}

export default {
    getData,
    clearCache
}