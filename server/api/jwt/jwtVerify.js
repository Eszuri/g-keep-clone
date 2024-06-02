import jwt from 'jsonwebtoken';
import { jwtPrivateKey } from "../../config/variabelGlobal.js";


function jwtVerifyEmail(req, res) {
    if (req.cookies.verifyEmail == undefined) {
        res.status(201).send({ noCookie: true, Message: "no email to verify" });
    } else {
        jwt.verify(
            req.cookies.verifyEmail,
            jwtPrivateKey, (err, data) => {
                if (err) {
                    res.status(201).send({ tokenExpired: true, message: "Token Has Expired" })
                } else {
                    res.status(200).send({ email: data.email, expires: data.expires })
                }
            }
        )
    }
}


export { jwtVerifyEmail };