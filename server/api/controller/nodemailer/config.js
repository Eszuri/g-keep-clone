import nodemailer from "nodemailer";
import 'dotenv/config'

const connectNodemailer = nodemailer.createTransport({
    service: process.env.SERVICE,
    host: process.env.HOST,
    port: process.env.PORT,
    secure: true,
    auth: {
        user: process.env.USER,
        pass: process.env.APP_PASSWORD,
    },
});

export { connectNodemailer };