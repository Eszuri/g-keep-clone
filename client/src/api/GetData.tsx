import axios, { AxiosResponse } from "axios";

interface UserData {
    email: string,
    name: string,
    avatar: string,
    age: string
}

interface ApiResponse {
    noCookie: boolean,
    jwtError: boolean,
    ok: UserData,
}

export default async function GetData(noCookie: () => void, jwtError: () => void, ok: (data: any) => void) {
    const API_URL = import.meta.env.VITE_API_URL;
    await axios.get(API_URL + 'api/user', { withCredentials: true })
        .then((response: AxiosResponse<ApiResponse>) => {
            if (response.data.noCookie) {
                noCookie()
            } else {
                if (response.data.jwtError) {
                    jwtError()

                } else {

                    ok(response.data)

                }
            }
        })
        .catch(() => {
            alert("Please Check Your Connection");
        })
};


