// import module
import validator from "email-validator"
import collectionsUser from "../../../model/account.js";
import passwordValidator from 'password-validator';
import jwt from 'jsonwebtoken';
import { expiredCookie, expiredJWT, jwtCookiesName, jwtPrivateKey } from "../../../../config/variabelGlobal.js";
import messageGmailVerifyRegister from "../../nodemailer/messageGmailVerifyRegister.js";
const shcema = new passwordValidator();


const emailRegister = (req, res) => {
    // check email is valid or not
    if (validator.validate(req.body.email) == true) {
        collectionsUser.findOne({ email: req.body.email })
            .then((user) => {
                if (user == null) {
                    // check password min length 5
                    if (req.body.password.length < 5) {
                        res.status(201).send({ passLength: true, message: "Password must be more than 5 characters" });
                    }
                    // check password not have spaces
                    else if (shcema.is().not().spaces().validate(req.body.password) == false) {
                        res.status(201).send({ notSpaces: true, message: "should not have spaces" });
                    }
                    else {
                        // hash password
                        const randomToken = Math.floor(1000 + Math.random() * 9000);
                        const exp = new Date().getTime() + (30 * 60 * 1000);
                        messageGmailVerifyRegister(req.body.email, randomToken);
                        res.status(200).cookie(
                            jwtCookiesName.verifyEmail,
                            jwt.sign({ email: req.body.email, password: req.body.password, token: randomToken, avatar: req.body.avatar, expires: new Date(exp).getTime() }, jwtPrivateKey, { expiresIn: '30m' }),
                            { maxAge: 1 * 60 * 60 * 1000, httpOnly: false, secure: true, sameSite: "Lax", }
                        ).send({ emailValid: true, message: "SUCCES" });
                    }
                }
                else {
                    res.status(201).send({ alreadyEmail: true, message: "Email already registered" })
                }
            })
    }
    else {
        res.status(201).send({ emailValid: false, message: "Email No Valid" });
    }
}

// export callback function
export default emailRegister;