import { expiredCookie, expiredJWT, jwtCookiesName, jwtPrivateKey } from "../../../config/variabelGlobal.js";
import collectionsUser from "../../model/account.js";
import jwt from 'jsonwebtoken';

const callbackUploadAvatar = function (req, res) {
    if (!req.file) {
        res.status(201).send({ errorUpload: true, message: "error occurred when uploading." });
    }
    else if (!req.file) {
        res.status(201).send({ errorUpload: true, message: "An unknown error occurred when uploading." });
    }
    else {
        collectionsUser.findOne({ email: req.body.email })
            .then(db => {
                const token = jwt.sign({ email: db.email, avatar: db.avatar, name: db.name, age: db.age }, jwtPrivateKey, { expiresIn: expiredJWT });
                res.status(200)
                    .cookie(jwtCookiesName.authToken, token, { maxAge: expiredCookie, httpOnly: true, secure: true, sameSite: "None", path: "/" })
                    .send({ succes: true, message: "Update Data Succesfully" })
            })
    }
};

export default callbackUploadAvatar;