import { expiredCookie, expiredJWT, jwtCookiesName, jwtPrivateKey } from "../../../config/variabelGlobal.js";
import collectionsUser from "../../model/account.js";
import jwt from 'jsonwebtoken';

const emailUpdateProfil = (req, res) => {
    collectionsUser.findOneAndUpdate({ email: req.body.email }, { name: req.body.name, age: req.body.age })
        .then(() => {
            collectionsUser.findOne({ email: req.body.email })
                .then(db => {
                    const token = jwt.sign({ email: db.email, avatar: db.avatar, name: db.name, age: db.age }, jwtPrivateKey, { expiresIn: expiredJWT });
                    res.status(200)
                        .cookie(jwtCookiesName.authToken, token, { maxAge: expiredCookie, httpOnly: false, secure: true, sameSite: "None", path: "/" })
                        .send({ succes: true, message: "Update Data Succesfully" })
                })
        })
        .catch(err => {
            res.status(200).send({ succes: false, message: "Update Data Failed" })
        })
};


export default emailUpdateProfil; 