// import module
import express from 'express';
import connectMongoDB from './config/connect.js';
import middleware from './middleware/middleware.js';
import middlewareRoute from './middleware/middlewareRoute.js';
const app = express();


// connect to mongodb
connectMongoDB();

// middleware
middleware(app);
middlewareRoute(app);


// run on localhost
app.listen(4000, () => {
    console.log("localhost running: http://localhost:4000");
});