import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { Button, ModalFooter } from '@nextui-org/react';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';
import Loading from '../components/Loading';
import { toast, Toaster } from 'sonner';
import { Helmet } from 'react-helmet-async';

export default function VerifyEmail() {
    interface dataType {
        email: string;
        expired: number | null | string
    };

    interface modalType {
        open: boolean,
        title: string,
        content: string,
        display: boolean
        children?: ReactNode
    };

    const API_URL = import.meta.env.VITE_API_URL;
    const input0 = useRef<HTMLInputElement>(null);
    const input1 = useRef<HTMLInputElement>(null);
    const input2 = useRef<HTMLInputElement>(null);
    const input3 = useRef<HTMLInputElement>(null);
    const [refreshToken, setrefreshToken] = useState({
        text: true,
        modal: true,
        cooldown: true,
        cooldownText: ""
    });
    const [disableBtn, setDisableBtn] = useState(true);
    const [data, setdata] = useState<dataType>({
        email: '',
        expired: null,
    });
    const [modal, setmodal] = useState<modalType>({
        open: false,
        title: "",
        content: "",
        children: null,
        display: true,
    })
    const navigate = useNavigate();

    const disableBTN = () => {
        if (input0.current?.value.length == 1 && input1.current?.value.length == 1 && input2.current?.value.length == 1 && input2.current?.value.length == 1 && input3.current?.value.length == 1) {
            setDisableBtn(false);
        } else {
            setDisableBtn(true);
        }
    }

    const moveFocus = (ref: React.RefObject<HTMLInputElement>) => {
        if (ref.current) {
            ref.current.focus();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, ref: React.RefObject<HTMLInputElement>) => {
        if (e.target.value.length === 1) {
            moveFocus(ref);
            disableBTN();
        } else {
            disableBTN();
        }
    };

    const [counter, setCounter] = useState<number>(() => {
        const savedCounter = localStorage.getItem('cooldown');
        return savedCounter ? parseInt(savedCounter, 10) : 60;
    });
    const [isCounting, setIsCounting] = useState<boolean>(() => {
        const savedCounter = localStorage.getItem('cooldown');
        return savedCounter ? parseInt(savedCounter, 10) > 0 : false;
    });

    const verify = async () => {
        if (input0.current && input1.current && input2.current && input3.current) {
            await axios.post(API_URL + 'api/verify-email', { token: input0.current?.value + input1.current?.value + input2.current?.value + input3.current?.value }, { withCredentials: true })
                .then((res: AxiosResponse) => {
                    if (res.data.noCookie) {
                        toast.error("Not Email For Register", {
                            style: {
                                backgroundColor: "rgb(214, 30, 30)",
                                color: "white"
                            }
                        })
                    } else {
                        if (res.data.tokenExpired) {
                            toast.error("Token Is Expired", {
                                style: {
                                    backgroundColor: "rgb(214, 30, 30)",
                                    color: "white"
                                }
                            })
                        }
                        else if (res.data.registerSucces) {
                            toast.success("Account Succes Created", {
                                style: {
                                    backgroundColor: "green",
                                    color: "white"
                                }
                            })
                            setTimeout(() => {
                                navigate("/login");
                            }, 500);
                        } else {
                            toast.error("Token Is Incorrect", {
                                style: {
                                    backgroundColor: "rgb(214, 30, 30)",
                                    color: "white"
                                }
                            })
                        }
                    }
                })
                .catch(() => {
                    alert("Please Check Your Connection");
                })
        }
    };

    const resendToken = (e: any) => {
        e.target.disabled = true;
        axios.get(API_URL + "api/register/resend-token", { withCredentials: true })
            .then((res: AxiosResponse) => {
                if (res.data.resend) {

                    toast.success("Succes Refresh Token", {
                        style: {
                            backgroundColor: "green",
                            color: "white"
                        }
                    })
                    // window.location.reload();

                } else {
                    toast.error("ERROR ReGenerate Token", {
                        style: {
                            backgroundColor: "red",
                            color: "white"
                        }
                    })
                }
            })
            .catch(() => {
                alert("Please Check Your Connection");
            })
    };


    const handleStartCountdown = () => {
        setCounter(60);
        localStorage.setItem('cooldown', '60');
        setIsCounting(true);
    };


    useEffect(() => {
        if (isCounting) {
            const timer = setInterval(() => {
                setCounter((prevCounter) => {
                    const newCounter = prevCounter > 0 ? prevCounter - 1 : 0;
                    localStorage.setItem('cooldown', newCounter.toString());
                    if (newCounter === 0) {
                        setIsCounting(false);
                    }
                    return newCounter;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [isCounting]);


    useEffect(() => {
        axios.get(API_URL + 'api/jwt-verify-email', { withCredentials: true })
            .then((res: AxiosResponse) => {
                if (res.data.noCookie) {
                    setmodal({ display: false, open: true, title: "Warning", content: "Not Email For Verify Email" })
                } else {
                    if (res.data.tokenExpired) {
                        setrefreshToken({ ...refreshToken, modal: false })
                        setmodal({ display: false, open: true, title: "Warning", content: "Token/code verification has expired" })
                    } else {
                        const exp = new Date(res.data.expires);
                        setrefreshToken({ ...refreshToken, text: false });
                        setmodal({ display: false, open: false, title: "", content: "" });
                        setdata({ email: res.data.email, expired: exp.getHours().toString().padStart(2, '0') + '.' + exp.getMinutes().toString().padStart(2, '0') });
                    }
                }
            })
            .catch(() => {
                alert("Please Check Your Connection");
            })
    }, [])

    return (
        <>
            <Helmet>
                <title>Penyimpan Catatan | Verifikasi Email</title>
                <meta name="description" content="Page Untuk verifikasi bahwa email anda adalah asli" />
            </Helmet>
            <Toaster duration={4000} visibleToasts={1} />
            <Loading open={modal.display} />
            <Alert open={modal.open} title={modal.title} content={modal.content} children={
                refreshToken.modal ? '' :
                    <ModalFooter>
                        <Button className='w-full' color='primary' radius='sm' onClick={() => { navigate('/register') }}>Sign Up Again</Button >
                    </ModalFooter>
            } />







            <section className='scale-[1.4] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <form className="flex flex-col items-center relative overflow-hidden p-5 bg-gradient-to-r from-[#3f4c6b] to-[#606c88] rounded-xl shadow-2xl max-w-xs">
                    <div className="mb-2.5">
                        <span className="text-white text-2xl leading-7 font-extrabold tracking-tight">OTP Verification</span>
                        <p className="text-white mt-2.5 text-sm">Please enter the code we have sent you.</p>
                        <span className='w-full inline-flex justify-center text-black/75 font-semibold'>{data.email}</span>
                    </div>
                    <div className="flex justify-between gap-2.5">
                        <input type="tel" maxLength={1} ref={input0} onChange={(e) => handleChange(e, input1)} className="h-10 w-10 outline-none text-center text-xl text-white rounded-md border border-white/40 bg-white/5 focus:border-indigo-500" />
                        <input type="tel" maxLength={1} ref={input1} onChange={(e) => handleChange(e, input2)} className="h-10 w-10 outline-none text-center text-xl text-white rounded-md border border-white/40 bg-white/5 focus:border-indigo-500" />
                        <input type="tel" maxLength={1} ref={input2} onChange={(e) => handleChange(e, input3)} className="h-10 w-10 outline-none text-center text-xl text-white rounded-md border border-white/40 bg-white/5 focus:border-indigo-500" />
                        <input type="tel" maxLength={1} ref={input3} onChange={(e) => handleChange(e, input3)} className="h-10 w-10 outline-none text-center text-xl text-white rounded-md border border-white/40 bg-white/5 focus:border-indigo-500" />
                    </div>
                    <Button className='w-full bg-white uppercase text-base font-semibold disabled:cursor-not-allowed disabled:bg-white/25 mt-2' disabled={disableBtn} onClick={verify}>Verify</Button>
                    <p className="text-white mt-2.5 text-sm text-center">this code expired after: <span className="font-extrabold cursor-pointer hover:underline">{data.expired}</span></p>
                    {refreshToken.text ? "" : <p className="text-white mt-2.5 text-sm text-center">Not Receive Email Message?
                        {
                            isCounting ?
                                (<span className='font-extrabold cursor-pointer hover:underline ml-1'>{counter}</span>)
                                :
                                (<button className="font-extrabold cursor-pointer hover:underline ml-1" onClick={(e) => { resendToken(e); handleStartCountdown() }}>Resend</button>)
                        }
                    </p>}
                </form>
            </section>
        </>
    );
}
