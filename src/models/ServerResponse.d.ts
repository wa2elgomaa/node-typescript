/**
 * @typedef ServerResponse
 * @property {JSON} results - object contains unified json results from github
 * @property {string} status.required - status code 
 * @property {string} statusText - displaying status text 
 */

export default interface ServerResponse {
    results? : JSON, 
    status : number, 
    statusText? : string
}
