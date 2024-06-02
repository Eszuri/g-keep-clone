import { expiredCookie, expiredJWT, jwtCookiesName, jwtPrivateKey } from "../../config/variabelGlobal.js";
import collectionsUser from "../model/account.js";
import jwt from 'jsonwebtoken';


async function generateTokenAuth_Token(findEmail) {
    try {
        let user = await collectionsUser.findOne({ email: findEmail });
        if (!user) throw new Error('User not found');

        let token = jwt.sign({
            id: user._id,
            email: user.email,
            password: user.password,
            avatar: user.avatar,
            name: user.name,
            age: user.age
        }, jwtPrivateKey, { expiresIn: expiredJWT });

        return token;
    } catch (err) {
        console.log(err);
        return null;  // Atau Anda bisa mengembalikan nilai yang sesuai jika terjadi kesalahan
    }
}


// function generateTokenAuth_Token(findEmail) {
//     let token;
//     collectionsUser.findOne({ email: 'elynaria28@gmail.com' })
//         .then(user => {
//             token = jwt.sign({ id: user._id, email: user.email, password: user.password, avatar: user.avatar, name: user.name, age: user.age }, jwtPrivateKey, { expiresIn: expiredJWT });
//             // return res.status(200)
//             //     .cookie(jwtCookiesName, token, { maxAge: expiredCookie, httpOnly: false,secure: true, sameSite: true,, path: "/api/protected" })
//         }).catch((err) => {
//             console.log(err);
//         })
//     return token
// };


export { generateTokenAuth_Token };