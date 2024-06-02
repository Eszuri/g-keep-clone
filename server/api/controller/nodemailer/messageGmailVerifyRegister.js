import { connectNodemailer } from './config.js';

const messageGmailVerifyRegister = (email, token) => {

    const message = {
        from: "ualdo296@gmail.com",
        to: email,
        subject: "TESTING NODE MAILER",
        text: `THIS MESSAGE : ${token}`
    }

    connectNodemailer.sendMail(message, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).send({ sentMessage: true, message: "message sent gmail" })
        }
    })
};

export default messageGmailVerifyRegister;