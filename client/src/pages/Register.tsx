import { Link, useNavigate } from 'react-router-dom'
import { Input, } from '@nextui-org/react'
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import MailIcon from '../icon/Mail';
import PasswordIcon from '../icon/Password';
import axios from 'axios';
import { EyeSlash, Eye } from '../icon/Eye';
import GetData from '../api/GetData';
import { Helmet } from 'react-helmet-async';


export default function Register() {
    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const passwordRef = useRef<HTMLInputElement>(null);
    const [disabled, setdisabled] = useState(false);
    const [typePassword, settypePassword] = useState(true);
    const [inputValue, setinputValue] = useState({
        email: "",
        password: "",
    });

    const [errorMessage, setErrorMessage] = useState({
        email: "",
        password: "",
    });

    const [invalid, setInvalid] = useState({
        email: false,
        password: false,
    });

    async function CreateUser(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        await axios.post(API_URL + 'api/register/email', { email: inputValue.email, password: inputValue.password, avatar: API_URL + 'images/avatars/default.png' }, { withCredentials: true })
            .then((response) => {
                if (response.data.emailValid == false) {
                    setErrorMessage({ ...errorMessage, email: "Email Not Valid" });
                    setInvalid({ ...invalid, email: true });
                }
                else if (response.data.notSpaces) {
                    setErrorMessage({ ...errorMessage, password: "Password should not have space" });
                    setInvalid({ ...invalid, password: true });
                }
                else if (response.data.passLength) {
                    setErrorMessage({ ...errorMessage, password: "Password must be more than 5 characters" });
                    setInvalid({ ...invalid, password: true });
                }
                else if (response.data.alreadyEmail) {
                    setErrorMessage({ ...errorMessage, email: "Email Already Registered" });
                    setInvalid({ ...invalid, email: true });
                } else {
                    setdisabled(true);
                    navigate('/verification-email');
                    localStorage.setItem('cooldown', '60');
                }
            })
            .catch(() => {
                alert("Please Check Your Connection");
            })
    };


    useEffect(() => {
        GetData(() => {
            // 
        }, () => {
            // 
        }, () => {
            navigate('/');
        });
    })

    return (
        <>
            <Helmet>
                <title>Penyimpan Catatan | Regristrasi</title>
                <meta name="description" content="buat akun untuk membuat akses ke web ini" />
            </Helmet>
            <section className='flex justify-center items-center w-full h-screen'>
                <form className="flex flex-col gap-2.5 bg-white p-7 w-[450px] rounded-2xl" onSubmit={CreateUser}>
                    <div className="flex flex-col">
                        <label className="text-[#151717] font-semibold">Email </label>
                    </div>
                    <Input isDisabled={disabled} errorMessage={errorMessage.email} value={inputValue.email} isInvalid={invalid.email} variant='bordered' radius='sm' classNames={{
                        inputWrapper: [
                            "h-11",
                            "bg-transparent",
                            "data-[hover=true]:bg-transparent",
                            "data-[focus=true]:bg-black",
                            "group-data-[focus=true]:bg-transparent",
                            "shadow-none"
                        ],
                        input: [
                            "text-lg",
                            "font-semibold",
                            "placeholder:text-base",
                            "placeholder:font-600",
                            "placeholder:text-black/40"
                        ]
                    }} placeholder="Enter your Email"
                        startContent={
                            <div className='mr-2'><MailIcon /></div>
                        }
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => { setinputValue({ ...inputValue, email: e.target.value }); setInvalid({ ...invalid, email: false }) }}
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                            if (e.key === "Enter" && passwordRef.current) {
                                passwordRef.current.focus();
                            }
                        }}
                    />
                    <div className="flex flex-col">
                        <label className="text-[#151717] font-semibold">Password </label>
                    </div>
                    <Input isDisabled={disabled} errorMessage={errorMessage.password} value={inputValue.password} isInvalid={invalid.password} variant='bordered' radius='sm'
                        onKeyDown={(e: any) => {
                            if (e.key === "Enter") {
                                CreateUser(e)
                            }
                        }}
                        ref={passwordRef}
                        classNames={{
                            inputWrapper: [
                                "h-11",
                                "bg-transparent",
                                "data-[hover=true]:bg-transparent",
                                "data-[focus=true]:bg-black",
                                "group-data-[focus=true]:bg-transparent",
                                "shadow-none"
                            ],
                            input: [
                                "text-lg",
                                "font-semibold",
                                "placeholder:text-base",
                                "placeholder:font-600",
                                "placeholder:text-black/40"
                            ]
                        }} placeholder="Enter your Password"
                        type={typePassword ? "password" : "text"}
                        startContent={
                            <div className='mr-2'><PasswordIcon /></div>
                        }
                        endContent={
                            <button className='absolute top-1/2 transform -translate-y-1/2 right-3 scale-125' onClick={(e: FormEvent<HTMLButtonElement>) => {
                                e.preventDefault();
                                settypePassword(!typePassword)
                            }}>
                                {typePassword ?
                                    <Eye /> : <EyeSlash />
                                }
                            </button>
                        }
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => { setinputValue({ ...inputValue, password: e.target.value }); setInvalid({ ...invalid, password: false }) }}
                    />
                    <button type='submit' className="mt-5 bg-[#151717] text-white font-medium text-lg py-3 rounded-lg hover:bg-[#252727]">Sign Up</button>
                    <p className="text-center text-black text-sm mt-2">Already have an account? <Link to={'/login'} className="text-[#2d79f3] font-medium cursor-pointer">Sign In</Link></p>
                    <p className="text-center text-black text-sm mt-2">Or With</p>
                    <div className="flex flex-row gap-2.5 justify-between mt-2">
                        <button className="btn flex items-center justify-center w-full h-12 rounded-lg border border-[#ededef] bg-white hover:border-[#2d79f3]"
                            onClick={() => { alert("belum bikin fitur") }}
                        >
                            <svg version="1.1" width={20} id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xmlSpace="preserve">
                                <path style={{ fill: '#FBBB00' }} d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256
                                c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456
                                C103.821,274.792,107.225,292.797,113.47,309.408z" />
                                <path style={{ fill: '#518EF8' }} d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451
                                c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535
                                c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z" />
                                <path style={{ fill: '#28B446' }} d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512
                                c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771
                                c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z" />
                                <path style={{ fill: '#F14336' }} d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012
                                c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0
                                C318.115,0,375.068,22.126,419.404,58.936z" />
                            </svg>
                            Google
                        </button>
                        <button className="btn flex items-center justify-center w-full h-12 rounded-lg border border-[#ededef] bg-white hover:border-[#2d79f3]"
                            onClick={() => { alert("belum bikin fitur") }}
                        >
                            <svg version="1.1" height={20} width={20} id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22.773 22.773" xmlSpace="preserve">
                                <g>
                                    <g>
                                        <path d="M15.769,0c0.053,0,0.106,0,0.162,0c0.13,1.606-0.483,2.806-1.228,3.675c-0.731,0.863-1.732,1.7-3.351,1.573 c-0.108-1.583,0.506-2.694,1.25-3.561C13.292,0.879,14.557,0.16,15.769,0z" />
                                        <path d="M20.67,16.716c0,0.016,0,0.03,0,0.045c-0.455,1.378-1.104,2.559-1.896,3.655c-0.723,0.995-1.609,2.334-3.191,2.334 c-1.367,0-2.275-0.879-3.676-0.903c-1.482-0.024-2.297,0.735-3.652,0.926c-0.155,0-0.31,0-0.462,0 c-0.995-0.144-1.798-0.932-2.383-1.642c-1.725-2.098-3.058-4.808-3.306-8.276c0-0.34,0-0.679,0-1.019 c0.105-2.482,1.311-4.5,2.914-5.478c0.846-0.52,2.009-0.963,3.304-0.765c0.555,0.086,1.122,0.276,1.619,0.464 c0.471,0.181,1.06,0.502,1.618,0.485c0.378-0.011,0.754-0.208,1.135-0.347c1.116-0.403,2.21-0.865,3.652-0.648 c1.733,0.262,2.963,1.032,3.723,2.22c-1.466,0.933-2.625,2.339-2.427,4.74C17.818,14.688,19.086,15.964,20.67,16.716z" />
                                    </g>
                                </g>
                            </svg>
                            Apple
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}
