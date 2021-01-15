import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDoc from "./swagger.json";

// create express application instance
const app = express();


// config env files 
dotenv.config();

// support parsing of application/json type post data
app.use(bodyParser.json());

// enable cors
app.use(cors());
var allowCrossDomain = function(req : express.Request, res : express.Response , next : Function) {
    res.header("Access-Control-Allow-Origin", "*"); // allow requests from any other server
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); // allow these verbs
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control");
    next();
}
app.use(allowCrossDomain); // plumbing it in as middleware


// API 
app.use('/api', router);

// initlizing swagger 
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDoc));


export default app;