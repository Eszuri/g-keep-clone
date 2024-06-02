import cookieParser from "cookie-parser";
import cors from "cors";
import express from 'express';



const middleware = (app) => {
    app.use(cors({
        origin: "http://localhost:5173",
        credentials: true,
    }));
    app.use(express.json({ limit: "10mb" }));
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(express.static("static"));
}

export default middleware;