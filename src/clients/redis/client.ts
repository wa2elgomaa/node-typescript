// import node modules
const redis = require('redis');

import {DB_PORT} from '../../configs/app.config';

// create and connect redis client to local instance.
const client = redis.createClient(DB_PORT || 6379)
 
// echo redis errors to the console
client.on('error', (err : Error) => {
    console.log("DB Client Error " + err.message)
})

export default client