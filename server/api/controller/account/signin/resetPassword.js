import collectionsUser from "../../../model/account.js";
import messageGmailResetPassword from "../../nodemailer/messageGmailResetPassword.js";
import bcrypt from 'bcrypt';

const generateTokenResetPassword = (req, res) => {
    const email = req.body.email;
    const randomToken = String(Math.floor(1000000000 + Math.random() * 9999999999));
    collectionsUser.findOne({ email: email })
        .then(user => {
            if (user == null) {
                res.status(201).send({ noAccount: true, message: "account not found" });
            } else {
                messageGmailResetPassword(user.email, user._id, randomToken);
                collectionsUser.findOneAndUpdate({ email: user.email }, { resetPasswordToken: randomToken })
                    .then(() => {
                        res.status(200).send({ accountFound: true, Message: "Account Found" })
                    })
            }
        })
};


const resetPassword = (req, res) => {
    const getID = req.body.id;
    const getTOKEN = req.body.token;
    const password = req.body.password;
    if (getID == null || getTOKEN == null) {
        res.status(201).send({ error: true, Message: "ID or TOKEN not valid" })
    } else {
        collectionsUser.findOne({ _id: getID })
            .then((data) => {
                if (data.resetPasswordToken == getTOKEN) {
                    if (req.body.confirm == true) {
                        bcrypt.hash(password, 8, (err, hash) => {
                            collectionsUser.findOneAndUpdate({ _id: getID }, { password: hash, resetPasswordToken: "|%20|" })
                                .then(() => {
                                    res.status(200).send({ updated: true, Message: "Password Updated" });
                                })
                        })
                    } else {
                        res.status(200).send({ succes: true, Message: "please confirm for update password" });
                    }
                }
                else {
                    res.status(201).send({ tokenIncorrect: true, message: "tokens are not the same" })
                }
            })
            .catch((err) => {
                res.status(201).send({ notValid: true, message: "the url you provided is wrong" })
            })
    }
};

export { generateTokenResetPassword, resetPassword };