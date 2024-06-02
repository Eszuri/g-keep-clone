import jwt from 'jsonwebtoken';
import collectionsUser from '../model/account.js';
import { jwtPrivateKey } from '../../config/variabelGlobal.js';

function getData(req, res) {
    if (req.cookies.auth_token == undefined) {
        res.status(201).send({ noCookie: true, message: "Cookie Empty" });
    } else {
        jwt.verify(req.cookies.auth_token, jwtPrivateKey, (err, data) => {
            if (err) {
                res.status(201).send({ jwtError: true, message: "Session Ended" });
            } else {
                collectionsUser.findOne({ email: data.email })
                    .then((db) => {
                        res.status(200).send({
                            email: db.email,
                            name: db.name,
                            avatar: db.avatar,
                            age: db.age,
                            data: db.dataNote
                        })
                    })
                    .catch(() => {
                        res.status(201).send({ noCookie: true, message: "Token Error" });
                    })
            }
        })
    }
}

export default getData;