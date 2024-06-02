import jwt from 'jsonwebtoken';
import { jwtPrivateKey } from '../../../../config/variabelGlobal.js';
import collectionsUser from '../../../model/account.js';

const updateNote = (req, res) => {
    jwt.verify(req.cookies.auth_token, jwtPrivateKey, (err, data) => {
        if (err) {
            res.status(201).send({ noUser: true, message: "Failed Verify Token" });
        } else {
            const dateHours = new Date().getHours();
            const dateMinutes = new Date().getMinutes();
            const email = req.body.email;
            const label = req.body.label;
            const content = req.body.content;
            const orderArray = req.body.index;
            let addzeroHours;
            let addzeroMinutes;
            if (dateHours < 10) { addzeroHours = "0" + dateHours; } else { addzeroHours = dateHours };
            if (dateMinutes < 10) { addzeroMinutes = "0" + dateMinutes; } else { addzeroMinutes = dateMinutes };
            collectionsUser.findOneAndUpdate(
                { email: data.email },
                {
                    $set: {
                        [`dataNote.${orderArray}.label`]: label,
                        [`dataNote.${orderArray}.content`]: content,
                        [`dataNote.${orderArray}.updateDate`]: addzeroHours + "." + addzeroMinutes,
                    }
                },
                { new: true, upsert: true })
                .then(() => {
                    res.status(200).send({ success: true, Message: "add note success" })
                })
                .catch(() => {
                    res.status(201).send({ noUser: true, message: "User Not found" });
                })
        }
    })
};

export default updateNote;