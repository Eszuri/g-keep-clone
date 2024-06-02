import { Button, ModalFooter } from "@nextui-org/react";
import axios, { AxiosResponse } from "axios"
import { motion } from "framer-motion"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import GetData from "../api/GetData";
import Loading from "../components/Loading";
import Alert from "../components/Alert";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function Profil() {
    const API_URL = import.meta.env.VITE_API_URL;
    const valueName: any = useRef(null);
    const valueAge: any = useRef(null);
    const [file, setFile] = useState<File | null | string | Blob | any>(null);
    const [Animate, setAnimate] = useState(0);
    const [uploadImage, setuploadImage] = useState({
        name: "No selected file",
        btnSave: true,
    });
    const [user, setuser] = useState<any>({
        email: "",
        avatar: "",
        name: "",
        age: ""
    });
    const [inputValue, setinputValue] = useState({
        name: "",
        email: "",
        age: "",
    });
    const [isVisible, setisVisible] = useState({
        onChangeValue: false,
        jwtError: false,
        notLogged: false,
        loading: true
    })

    useEffect(() => {
        GetData(() => {
            setisVisible({ ...isVisible, notLogged: true, loading: false });
        }, () => {
            setisVisible({ ...isVisible, notLogged: true, loading: false });
        }, (user) => {
            setuser({ email: user.email, avatar: user.avatar, name: user.name, age: user.age })
            setisVisible({ ...isVisible, loading: false });
        });
    }, []);


    const updateProfil = async () => {
        await axios.put(API_URL + "api/update/profil", { email: user.email, name: valueName.current.value, age: valueAge.current.value }, { withCredentials: true })
            .then((response: AxiosResponse) => {
                if (response.data.success = true) {
                    setAnimate(1);
                    window.location.reload();
                }
            })
            .catch(() => {
                alert("Please Check Your Connection");
            })
    };

    const upload = () => {
        setisVisible({ ...isVisible, loading: true });
        const formData = new FormData()
        formData.append('email', user.email);
        formData.append('photo', file); // The position must always be at the bottom
        axios.post(API_URL + 'api/upload/avatar', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true,
        })
            .then((response: AxiosResponse) => {
                if (response.data.succes) {
                    window.location.reload()
                }
            })
            .catch(() => {
                alert("Please Check Your Connection");
            })
    }
    return (
        <>
            <Helmet>
                <title>Penyimpan Catatan | Your Profil</title>
                <meta name="description" content="Berisi data dari akun anda" />
            </Helmet>
            <Loading open={isVisible.loading} />

            <Alert open={isVisible.notLogged} title="User Not Found" content="If you are not logged in, please log in first">
                <ModalFooter>
                    <Link to={'/login'}><Button color="secondary">Login</Button></Link>
                </ModalFooter>
            </Alert>

            <motion.div
                animate={{
                    opacity: Animate,
                }}
                transition={{
                    duration: 0.7,
                }}
                aria-live="assertive" className="opacity-0 right-0 pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6">
                <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
                    <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="p-4">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="ml-3 w-0 flex-1 pt-0.5">
                                    <p className="text-sm font-medium text-gray-900">Successfully saved!</p>
                                    <p className="mt-1 text-sm text-gray-500">Your data has been updated</p>
                                </div>
                                <div className="ml-4 flex flex-shrink-0">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>






            <section className="w-1/2 max-lg:w-[50%] max-md:w-[60%] max-sm:w-[70%] max-[400px]:w-[85%] mx-auto text-white focus:text-black my-5 rounded p-2">
                <div className="w-full grid justify-center mb-5 gap-3">
                    <span className="text-center font-semibold">Profil Picture</span>
                    <label htmlFor="photo">
                        <img src={user.avatar} className="w-44  h-44 rounded-full" />
                    </label>
                    <input type="file" id="photo" className="hidden"
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            const data = event.target.files;
                            if (data && data.length > 0) {
                                const FR = new FileReader();
                                FR.readAsDataURL(data[0]);
                                FR.onload = (e) => {
                                    setuser({ ...user, avatar: e.target?.result });
                                    setuploadImage({ ...uploadImage, name: data[0].name, btnSave: false });
                                    setFile(data[0]);
                                }
                            }
                        }}
                    />
                    <Button style={{ display: uploadImage.btnSave ? "none" : "block" }}
                        onClick={upload}
                    >Save Picture</Button>
                </div>
                <div className="grid gap-8">
                    <div>
                        <label className="font-semibold" htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="text-black w-full p-2 h-10 rounded outline-none text-lg font-semibold bg-white/50 placeholder:text-black/50"
                            id="email"
                            placeholder="Set Your Email"
                            value={user.email}
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => { setinputValue({ ...inputValue, email: e.target.value }); }}
                        />
                    </div>
                    <div>
                        <label className="font-semibold" htmlFor="name">Name</label>
                        <input
                            className="text-black w-full p-2 h-10 rounded outline-none text-lg font-semibold bg-white/50 placeholder:text-black/50"
                            id="name"
                            placeholder="Set Your Name"
                            ref={valueName}
                            defaultValue={user.name}
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => { setinputValue({ ...inputValue, name: e.target.value }); setisVisible({ ...isVisible, onChangeValue: true }); }}
                        />
                    </div>
                    <div>
                        <label className="font-semibold" htmlFor="age">Age</label>
                        <input
                            className="text-black w-full p-2 h-10 rounded outline-none text-lg font-semibold bg-white/50 placeholder:text-black/50"
                            id="age"
                            ref={valueAge}
                            placeholder="Set Your Age"
                            defaultValue={user.age}
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => { setinputValue({ ...inputValue, age: e.target.value }); setisVisible({ ...isVisible, onChangeValue: true }); }}
                        />
                    </div>
                    <Button
                        style={{ display: isVisible.onChangeValue ? 'block' : "none" }}
                        onClick={updateProfil}
                    >SAVE CHANGED</Button>
                </div>
            </section >
        </>
    )
}
