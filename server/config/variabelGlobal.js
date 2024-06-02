const jwtPrivateKey = "Enter any words that are difficult or confidential";
const jwtCookiesName = {
    authToken: "auth_token", // if this string replace, please replace too in jwtVeryfy.js
    verifyEmail: "verifyEmail"
}
const expiredCookie = 365 * 24 * 60 * 60 * 1000; // 1 year
const expiredJWT = 30 * 24 * 60 * 60 * 1000; // 30day
const saveImageLocated = {
    photo_profil: "./static/images/avatars",
}
const getHostname = (req) => {
    return req.protocol + "://" + req.headers.host
}
// export all
export { jwtPrivateKey, jwtCookiesName, expiredCookie, expiredJWT, saveImageLocated, getHostname };