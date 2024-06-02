import jwt from 'jsonwebtoken';
import messageGmailVerifyRegister from '../../nodemailer/messageGmailVerifyRegister.js';
import { jwtCookiesName, jwtPrivateKey } from '../../../../config/variabelGlobal.js';
const resendToken = (req, res) => {
    const randomToken = Math.floor(1000 + Math.random() * 9000);
    const exp = new Date().getTime() + (30 * 60 * 1000);

    jwt.verify(req.cookies.verifyEmail, jwtPrivateKey, (err, data) => {
        messageGmailVerifyRegister(data.email, randomToken);
        res.status(200).cookie(
            jwtCookiesName.verifyEmail,
            jwt.sign({ email: data.email, password: data.password, token: randomToken, avatar: data.avatar, expires: new Date(exp).getTime() }, jwtPrivateKey, { expiresIn: '30m' }),
            { maxAge: 1 * 60 * 60 * 1000, httpOnly: false, secure: true, sameSite: "None", }
        ).send({ resend: true, message: "SUCCES REFRESH TOKEN" });
    })
};

export default resendToken;