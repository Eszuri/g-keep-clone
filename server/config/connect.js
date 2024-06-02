// import module
import "dotenv/config";
import mongoose from "mongoose";

// variable
const API = process.env.API;
const API_LOCAL = "mongodb://127.0.0.1:27017/";
// connect to mongodb
async function connectMongoDB() {
    await mongoose.connect(API)
        .then((result) => {
            console.log("SUCCES CONNECT TO MONGODB");
        }).catch((err) => {
            console.log("FAILED: " + err);
        });
};

// export function
export default connectMongoDB;