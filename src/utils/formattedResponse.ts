export default function getFormattedResponse(message : string , code : number , data? : any){
    return {
        results : data, 
        status : code, 
        statusText : message
    }
}
