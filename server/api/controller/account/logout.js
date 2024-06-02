import { jwtCookiesName } from "../../../config/variabelGlobal.js";

const logout = (req, res) => {
    res.clearCookie(jwtCookiesName.authToken, { httpOnly: true, secure: true, sameSite: "None", path: "/" }).send({ logout: true, message: "Logout Succes" })
}

export default logout;