import collectionsUser from "../../../model/account.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { expiredCookie, expiredJWT, jwtCookiesName, jwtPrivateKey } from "../../../../config/variabelGlobal.js";


const emailLogin = (req, res) => {
    collectionsUser.findOne({ email: req.body.email })
        .then(user => {
            bcrypt.compare(req.body.password, user.password, (err, data) => {
                if (data == true) {
                    const token = jwt.sign({ email: user.email, avatar: user.avatar, name: user.name, age: user.age }, jwtPrivateKey, { expiresIn: expiredJWT });
                    res.status(200).
                        cookie(jwtCookiesName.authToken, token, { maxAge: expiredCookie, httpOnly: false, path: "/" })
                        .send({ succes: true, token: token, message: "Login Succesfully" });
                } else if (data == false) {
                    res.status(201).send({ succes: false, message: "Password Incorrect" });
                }
            })
        })
        .catch(err => {
            res.status(201).send({ notFoundEmail: true, message: "email not registered" });
        });
}


// export callback function
export default emailLogin;