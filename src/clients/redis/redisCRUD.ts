import {promisify} from 'util';
import client from './client';
import {DB_DATA_EXPRIE} from '../../configs/app.config';
import ServerResponse from '../../models/ServerResponse';
import Entity from '../../models/ItemEntity';
import Utils from '../../utils';

const setAsync = promisify(client.setex).bind(client);
function save(redisKey : string , data : Entity[]) : Promise<ServerResponse>{
    return new Promise(async (resolve , reject) => {
        try {
            const response = await setAsync(redisKey, DB_DATA_EXPRIE , JSON.stringify(data));
            if(response){
                resolve(Utils.formattedResponse("Saved successfully" , 200));
            }
            else {
                resolve(Utils.formattedResponse("Couldn't insert data" , 502));
            }
        }catch(ex){
            console.error("Exception in promise for insert :", ex);
            reject(Utils.formattedResponse("Server internal error" , 500))
        }
    });
}

const getAsync = promisify(client.get).bind(client);
function select(redisKey : string) : Promise<ServerResponse>{
    return new Promise(async (resolve , reject) => {
        try {
            const response = await getAsync(redisKey);
            if(response){
                resolve(Utils.formattedResponse("Results retrieved successfully" , 200 ,JSON.parse(response)));
            }
            else {
                resolve(Utils.formattedResponse("Data not found" , 502));
            }
        }catch(ex){
            reject(Utils.formattedResponse("Server internal error" , 500));
        }
    });
}

const removeAsync = promisify(client.flushdb).bind(client);
async function remove() : Promise<ServerResponse>{
    return new Promise(async (resolve , reject) => {
        try {
            const response = await removeAsync();
            if(response == "OK"){
                resolve(Utils.formattedResponse("Cleared successfully" , 200));
            }
            else {
                resolve(Utils.formattedResponse("Couldn't remove the cache" , 500));
            }
        }catch(ex){
            reject(Utils.formattedResponse("Server internal error" , 500));
        }
    });
}

export default {
    save , 
    select,
    remove
}