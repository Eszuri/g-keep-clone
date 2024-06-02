import multer from 'multer';
import { expiredCookie, expiredJWT, getHostname, jwtCookiesName, jwtPrivateKey, saveImageLocated } from '../../../config/variabelGlobal.js';
import collectionsUser from '../../model/account.js';
import { generateTokenAuth_Token } from '../../jwt/generateToken.js';
import jwt from 'jsonwebtoken';


const storageAvatars = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, saveImageLocated.photo_profil);
    },
    filename: function (req, file, cb) {
        collectionsUser.findOne({ email: req.body.email })
            .then(function (user) {
                collectionsUser.findOneAndUpdate({ email: req.body.email }, { avatar: `${getHostname(req)}/images/avatars/${user._id}.png` })
                    .then(function (user2) {
                        return cb(null, user._id + ".png");
                    })
            })
    }
});

const multerUploadAvatars = multer({ storage: storageAvatars });

export { multerUploadAvatars }
