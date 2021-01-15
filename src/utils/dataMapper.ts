import Entity from '../models/ItemEntity';
import GitHubInput from '../models/GitHubInput';


function getCleanUsers(usersData : GitHubInput){
    let cleanUsers : Array<Entity> = [];
    cleanUsers = usersData?.items?.map((item , idx)=>{
        return {
            ID: item.id,
            displayName: item.login,
            icon : item.avatar_url,
            url : item.url,
            score : item.score
        }
    });
    return cleanUsers;
}

function getCleanIssues(usersData : GitHubInput){
    let cleanIssues : Array<Entity> = [];
    cleanIssues = usersData?.items?.map((item , idx)=>{
        return {
            ID: item.id,
            displayName: item.title,
            icon : item.user?.avatar_url,
            url : item.url,
            score : item.score
        }
    });
    return cleanIssues;
}

function getCleanRepositories(usersData : GitHubInput){
    let cleanRepositories : Array<Entity> = [];
    cleanRepositories = usersData?.items?.map((item , idx)=>{
        return {
            ID: item.id,
            displayName: item.name,
            icon : item.owner?.avatar_url,
            url : item.url,
            score : item.score
        }
    });
    return cleanRepositories;
}

function getCleanData(type : string , usersData : GitHubInput){
    switch(type){
        case "users":
            return getCleanUsers(usersData);
        case "issues": 
            return getCleanIssues(usersData);
        case "repositories": 
            return getCleanRepositories(usersData);
        default: 
            return [];
    }
}
export default {
    getCleanData,
}