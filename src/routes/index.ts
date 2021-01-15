import expressApp from 'express';
import Services from '../services';


// initialize router 
const appRouter = expressApp.Router();

/**
 * You can use this function to query data from github
 * @route GET /search
 * @group Search - Get users,issues,repositories from github 
 * @param {string} text.query.required - search query text 
 * @param {string} type.query.required - search type - eg: users || issues || repositories 
 * @returns {ServerResponse} 200 - An object contains mapped data and status code and status text
 * @returns {ServerResponse}  default - An object contains status code and status text
 */
appRouter.post('/search', Services.getData);


/**
 * You can use this function to clear cached data in redis
 * @route GET /clear-cache
 * @group Search - Clear redis caching 
 * @returns {ServerResponse} 200 - An object contains status code and status text
 * @returns {ServerResponse}  default - An object contains status code and status text
 */
appRouter.get('/clear-cache', Services.clearCache);

export default appRouter;