import { jwtPrivateKey } from "../../../../config/variabelGlobal.js";
import collectionsUser from "../../../model/account.js";
import jwt from 'jsonwebtoken';

const deleteNote = (req, res) => {
    const label = req.body.label;
    jwt.verify(req.cookies.auth_token, jwtPrivateKey, (err, data) => {
        collectionsUser.findOneAndUpdate(
            { email: data.email },
            { $pull: { dataNote: { label } } })
            .then(() => {
                res.status(200).send({ success: true, message: "Delete Succesfully" });
            })
    })
};


export { deleteNote }