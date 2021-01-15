/**
 * @typedef Entity
 * @property {number} ID.required
 * @property {string} displayName.required - the display name for the item (login || repo title || issue title )
 * @property {string} icon.required - the user avatar image url  
 * @property {string} url.required
 * @property {number} score.required  
 */
 export default interface Entity {
    ID: number;
    displayName: string
    icon : string
    url : string
    score : number
}