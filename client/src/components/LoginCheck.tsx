// import axios, { AxiosResponse } from "axios";
// import { useEffect } from "react";

// export default function LoginCheck() {
//     const API_URL = import.meta.env.VITE_API_URL;
//     useEffect(() => {
//         async function GetData() {
//             await axios.get(API_URL + 'api/protected', { withCredentials: true })
//                 .then((response: AxiosResponse) => {
//                     setuser({ email: response.data.email, avatar: response.data.avatar })
//                     if (response.data.noCookie) {
//                         setisVisible({ ...isVisible, onLogged: false });
//                     } else if (response.data.expiredJWT) {
//                         setisVisible({ ...isVisible, onLogged: false });
//                     } else {
//                         setisVisible({ onLogged: true, notLogged: false });
//                     }
//                 })
//         };

//         GetData();
//     }, [])
// }
