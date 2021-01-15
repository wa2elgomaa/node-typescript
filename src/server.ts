import Config from './configs/app.config';
import app from './app';

// express listener 
app.listen(process.env.PORT || Config.APP_PORT, () => {console.log("Server is running on port" , process.env.PORT || Config.APP_PORT)});


export default app;