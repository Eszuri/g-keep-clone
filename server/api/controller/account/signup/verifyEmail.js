import jwt from 'jsonwebtoken';
import { expiredJWT, jwtCookiesName, jwtPrivateKey } from '../../../../config/variabelGlobal.js';
import collectionsUser from '../../../model/account.js';
import bcrypt from 'bcrypt';
import { generateTokenAuth_Token } from '../../../jwt/generateToken.js';

const verifyEmail = async (req, res) => {
    if (req.cookies.verifyEmail == undefined) {
        res.status(201).send({ noCookie: true, Message: "no email to verify" });
    } else {
        jwt.verify(
            req.cookies.verifyEmail,
            jwtPrivateKey, (err, data) => {
                if (err) {
                    res.status(201).send({ tokenExpired: true, message: "Token Has Expired" })
                }
                else if (req.body.token == data.token) {
                    bcrypt.hash(data.password, 8, (err, hashPass) => {
                        collectionsUser.create({ email: data.email, password: hashPass, avatar: data.avatar, name: "", age: "", resetPasswordToken: "|%20|" }) // send to database
                            .then(() => {
                                res.status(200).clearCookie(jwtCookiesName.verifyEmail).send({ registerSucces: true, message: "Account Created" });
                            })
                    })
                }
                else {
                    res.status(201).send({ tokenIncorrect: true, message: "Input Token Incorrect" });
                }
            }
        )
    }
};


export default verifyEmail;
