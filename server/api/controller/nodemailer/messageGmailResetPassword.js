import { connectNodemailer } from './config.js';
import 'dotenv/config'

const messageGmailResetPassword = (email, id, token, success, failed) => {

    const message = {
        from: process.env.USER,
        to: email,
        subject: "TESTING NODE MAILER",
        text: `Please Enter The Url :`,
        html: `<a 
        style="width: 350px;height: 180px;background-color: black;outline: none;border: none;"
        href="http://localhost:5173/reset-password?id=${id}&token=${token}">
        Reset Password
        <a/>`
    }

    connectNodemailer.sendMail(message, (err, data) => {
        if (err) {
            failed(err);
        } else {
            success(data);
        }
    })
};

export default messageGmailResetPassword;