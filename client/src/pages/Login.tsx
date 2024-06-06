import { Link, useNavigate } from 'react-router-dom'
import { Button, Divider, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import MailIcon from '../icon/Mail';
import PasswordIcon from '../icon/Password';
import axios, { AxiosResponse } from 'axios';
import { Eye, EyeSlash } from '../icon/Eye';
import { toast, Toaster } from 'sonner';
import GetData from '../api/GetData';
import { Helmet } from 'react-helmet-async';


export default function Login() {
    const API_URL = import.meta.env.VITE_API_URL;
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
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


    const [resetPass, setresetPass] = useState({
        modal: false,
        btnSubmit: false,
        email: "",
        switch: true
    });


    const login = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await axios.post(API_URL + "api/login/email", { email: inputValue.email, password: inputValue.password }, { withCredentials: true })
            .then((response) => {
                if (response.data.notFoundEmail) {
                    setErrorMessage({ ...errorMessage, email: "Email Not Registered" });
                    setInvalid({ ...invalid, email: true });
                } else if (response.data.succes == true) {
                    setdisabled(true);
                    navigate('/');
                } else if (response.data.succes == false) {
                    setErrorMessage({ ...errorMessage, password: "Password Incorrect" });
                    setInvalid({ ...invalid, password: true });
                }
            })
            .catch(() => {
                alert("Please Check Your Connection");
            })
    };

    const resetpassword = (e: ChangeEvent<HTMLFormElement>) => {

        e.preventDefault();
        axios.post(API_URL + "api/login/token-reset-password", { email: resetPass.email })
            .then((response: AxiosResponse) => {
                if (response.data.noAccount) {
                    // console.log(window.location.protocol + "//" + window.location.hostname + window.location.port);
                    toast.error("Account Not Registered", {
                        style: {
                            backgroundColor: "rgb(201, 40, 40)",
                            color: "white"
                        }
                    })
                } else {
                    if (response.data.failed) {
                        toast.error("Failed Reset Password", {
                            style: { backgroundColor: "rgb(201, 40, 40)", color: "white" }
                        })
                    } else {
                        toast.success("token has been sent to your email", {
                            style: {
                                backgroundColor: "green",
                                color: "white"
                            }
                        });
                        setresetPass({ ...resetPass, btnSubmit: true, switch: false });
                    }
                }
            })
            .catch(() => {
                alert('Please Check Your Internet Connection')
            })
        // toast.error("Email Already")
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
                <title>Penyimpan Catatan | Login</title>
                <meta name="description" content="Login Page untuk masuk ke akun anda" />
                <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
            </Helmet>
            <Toaster duration={4000} visibleToasts={1} />
            <Modal
                isOpen={resetPass.modal}
                hideCloseButton={true}
                className='text-white'
            >
                {
                    resetPass.switch ?
                        <ModalContent className='bg-zinc-800'>
                            <ModalHeader className='flex flex-col'>
                                <h1>Reset Password</h1>
                                <Divider className='h-[3px] bg-white/30' />
                            </ModalHeader>
                            <form onSubmit={resetpassword}>
                                <ModalBody>
                                    <label htmlFor="resetPassword">Email:</label>
                                    <input type="email" disabled={resetPass.btnSubmit} required={true} id="resetPassword" className='rounded outline-none border-none text-black text-lg font-semibold h-8 p-2 bg-zinc-300' value={resetPass.email} onChange={(e: ChangeEvent<HTMLInputElement>) => { setresetPass({ ...resetPass, email: e.target.value }) }} />
                                </ModalBody>
                                <ModalFooter>
                                    <Button color='danger' onClick={() => { setresetPass({ ...resetPass, modal: false }) }} isDisabled={resetPass.btnSubmit} >Close</Button>
                                    <Button type='submit' color='primary' isDisabled={resetPass.btnSubmit}>Submit</Button>
                                </ModalFooter>
                            </form>
                        </ModalContent>
                        :
                        <ModalContent className='bg-zinc-800'>
                            <ModalHeader className='flex flex-col'>
                                <h1>Reset Password</h1>
                                <Divider className='h-[3px] bg-white/30' />
                            </ModalHeader>
                            <ModalBody>
                                <h1>Please check the message, I have sent to your email</h1>
                                <span>{resetPass.email}</span>
                            </ModalBody>
                            <ModalFooter>
                                <Button color='danger' onClick={() => { setresetPass({ ...resetPass, modal: false }) }} >Close</Button>
                            </ModalFooter>
                        </ModalContent>}
            </Modal >

            <section className='flex justify-center items-center w-full h-screen'>
                <form className="flex flex-col gap-2.5 bg-white p-7 w-[450px] rounded-2xl" onSubmit={login}>
                    <div className="flex flex-col">
                        <label className="text-[#151717] font-semibold">Email </label>
                    </div>
                    <Input
                        isDisabled={disabled}
                        errorMessage={errorMessage.email}
                        value={inputValue.email}
                        isInvalid={invalid.email}
                        variant='bordered'
                        radius='sm'
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
                        }}
                        placeholder="Enter your Email"
                        startContent={<div className='mr-2'><MailIcon /></div>}
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
                    <Input
                        onKeyDown={(e: any) => {
                            if (e.key === "Enter") {
                                login(e)
                            }
                        }}
                        ref={passwordRef}
                        isDisabled={disabled}
                        errorMessage={errorMessage.password}
                        value={inputValue.password}
                        isInvalid={invalid.password}
                        variant='bordered'
                        radius='sm'
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
                        }}
                        placeholder="Enter your Password"
                        type={typePassword ? "password" : "text"}
                        startContent={<div className='mr-2'><PasswordIcon /></div>}
                        endContent={
                            <button
                                className='absolute top-1/2 transform -translate-y-1/2 right-3 scale-125'
                                onClick={(e: FormEvent<HTMLButtonElement>) => {
                                    e.preventDefault();
                                    settypePassword(!typePassword)
                                }}>
                                {typePassword ? <Eye /> : <EyeSlash />}
                            </button>
                        }
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => { setinputValue({ ...inputValue, password: e.target.value }); setInvalid({ ...invalid, password: false }) }}
                    />
                    <div className="flex justify-between">
                        <span className="text-right w-full text-sm text-blue-500 cursor-pointer"
                            onClick={() => { setresetPass({ ...resetPass, modal: true }) }}
                        >Forgot password?</span>
                    </div>
                    <button type='submit' className="mt-5 bg-[#151717] text-white font-medium text-lg py-3 rounded-lg hover:bg-[#252727]">Sign In</button>
                    <p className="text-center text-black text-sm mt-2">Don't have an account? <Link to={'/register'} className="text-[#2d79f3] font-medium cursor-pointer">Sign Up</Link></p>
                    <p className="text-center text-black text-sm mt-2">Or With</p>
                    <div className="flex gap-2.5 justify-between mt-2">
                        <button className="flex items-center justify-center w-full h-12 rounded-lg border border-[#ededef] bg-white hover:border-[#2d79f3]"
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
                        <button className="flex items-center justify-center w-full h-12 rounded-lg border border-[#ededef] bg-white hover:border-[#2d79f3]"
                            onClick={() => { alert("belum bikin fitur") }}
                        >
                            <svg version="1.1" height={20} width={20} id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22.773 22.773" xmlSpace="preserve">
                                <g>
                                    <g>
                                        <path d="M15.769,0c0.053,0,0.106,0,0.162,0c0.13,1.606-0.483,2.806-1.228,3.675c-0.731,0.863-1.732,1.7-3.351,1.573
                                        c-0.108-1.583,0.506-2.694,1.25-3.561C13.292,0.879,14.557,0.16,15.769,0z" />
                                        <path d="M20.67,16.716c0,0.016,0,0.03,0,0.045c-0.455,1.378-1.104,2.559-1.896,3.655c-0.723,0.995-1.609,2.334-3.191,2.334
                                        c-1.367,0-2.275-0.879-3.676-0.903c-1.482-0.024-2.297,0.735-3.652,0.926c-0.155,0-0.31,0-0.462,0
                                        c-0.995-0.144-1.798-0.932-2.383-1.642c-1.725-2.098-3.058-4.808-3.306-8.276c0-0.34,0-0.679,0-1.019
                                        c0.105-2.482,1.311-4.5,2.914-5.478c0.846-0.52,2.009-0.963,3.304-0.765c0.555,0.086,1.122,0.276,1.619,0.464
                                        c0.471,0.181,1.06,0.502,1.618,0.485c0.378-0.011,0.754-0.208,1.135-0.347c1.116-0.403,2.21-0.865,3.652-0.648
                                        c1.733,0.262,2.963,1.032,3.723,2.22c-1.466,0.933-2.625,2.339-2.427,4.74C17.818,14.688,19.086,15.964,20.67,16.716z" />
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
