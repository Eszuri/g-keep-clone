import { connectNodemailer } from './config.js';

import 'dotenv/config'
const messageGmailVerifyRegister = (email, token, success, failed) => {

    const message = {
        from: process.env.USER,
        to: email,
        subject: "TESTING NODE MAILER",
        text: `THIS MESSAGE : ${token}`
    }

    connectNodemailer.sendMail(message, (err, data) => {
        if (err) {
            failed(err);
        } else {
            success(data);
        }
    })
};

export default messageGmailVerifyRegister;