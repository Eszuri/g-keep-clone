import { jwtCookiesName } from "../../../config/variabelGlobal.js";

const logout = (req, res) => {
    res.clearCookie(jwtCookiesName.authToken, { httpOnly: false, secure: true, sameSite: "Strict", path: "/" }).send({ logout: true, message: "Logout Succes" })
}

export default logout;