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

// API 
app.use('/api', router);

// initlizing swagger 
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDoc));


export default app;