import { Button, Card, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Divider } from '@nextui-org/react';
import axios, { AxiosResponse } from "axios"
import { ChangeEvent, useState } from "react"
import { Helmet } from 'react-helmet-async';
import { useLocation } from "react-router-dom"
import { toast, Toaster } from "sonner";

function ResetPassword() {
    const API_URL = import.meta.env.VITE_API_URL;
    const location = useLocation();
    const getQuery = new URLSearchParams(location.search);
    const queryID = getQuery.get('id');
    const queryTOKEN = getQuery.get('token');
    const regex = /^[^\s]{6,}$/;

    interface ALLTYPE {
        input?: string | any,
        confirm?: boolean,
        modal?: boolean,
        disable: boolean,
    }

    const [ALL, setALL] = useState<ALLTYPE>({
        input: "",
        confirm: false,
        modal: false,
        disable: false,
    })

    const Reset = () => {
        if (regex.test(ALL.input)) {
            axios.post(API_URL + "api/login/reset-password", { id: queryID, token: queryTOKEN, password: ALL.input, confirm: ALL.confirm })
                .then((result: AxiosResponse) => {
                    if (result.data.error) {
                        toast.error(result.data.Message, {
                            style: {
                                backgroundColor: 'rgb(201, 40, 40)',
                                color: "white"
                            }
                        });
                    } else {
                        if (result.data.notValid) {
                            toast.error("the url you provided is wrong", {
                                style: {
                                    backgroundColor: 'rgb(201, 40, 40)',
                                    color: "white"
                                }
                            })
                        } else if (result.data.tokenIncorrect) {
                            toast.error("tokens are not the same", {
                                style: {
                                    backgroundColor: 'rgb(201, 40, 40)',
                                    color: "white"
                                }
                            })
                        } else if (result.data.succes) {
                            setALL({ ...ALL, modal: true, confirm: true });
                        } else if (result.data.updated) {
                            setALL({ ...ALL, modal: false, disable: true });
                            toast.success("Password Succes Updated", {
                                style: {
                                    backgroundColor: 'green',
                                    color: "white"
                                }
                            })
                        }
                    }
                }).catch(() => {
                    toast.error('Please Check Your Connection', {
                        style: {
                            backgroundColor: 'rgb(201, 40, 40)',
                            color: "white"
                        }
                    })
                });
        } else {
            toast.error("Input must be more than 5 characters and contain no spaces.", {
                style: {
                    backgroundColor: 'rgb(201, 40, 40)',
                    color: "white"
                }
            })
        }
    }

    return (
        <>
            <Helmet>
                <title>Penyimpan Catatan | Reset Password</title>
                <meta name="description" content="Page untuk membuat password baru" />
            </Helmet>
            <Modal isOpen={ALL.modal} hideCloseButton={true}>
                <ModalContent>
                    <ModalHeader className='flex flex-col gap-2'>
                        <h1 className='text-2xl font-bold'>Update Password ?</h1>
                        <Divider className='h-[3px]' />
                    </ModalHeader>
                    <ModalBody className='mt-[-10px]'>
                        <p className='text-lg font-semibold'>Do you really agree with this new password?</p>
                        <span className='text-lg font-bold'>'{ALL.input}'</span>
                    </ModalBody>
                    <ModalFooter className='mt-4'>
                        <Button radius='sm' className='text-lg text-white mr-3 w-28 h-12' style={{ backgroundColor: "rgb(300, 40, 50)" }} onClick={() => { setALL({ ...ALL, modal: false, confirm: false }); }}>No</Button>
                        <Button color='success' radius='sm' className='text-lg text-white w-28 h-12' onClick={() => {
                            setALL({ ...ALL, confirm: true });
                            Reset();
                        }}>Yes</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal >
            <Toaster duration={4000} visibleToasts={1} />
            <Card className="bg-slate-500 text-white max-w-[500px] w-full min-w-[320px] overflow-visible absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-100%] p-2">
                <h1 className="text-center absolute left-1/2 translate-x-[-50%] top-[-50px] text-3xl">Reset Password</h1>
                <form className="flex flex-col p-2 gap-3" onSubmit={(e: ChangeEvent<HTMLFormElement>) => { Reset(); e.preventDefault(); }}>
                    <label htmlFor="input" className="text-lg font-bold">New Password:</label>
                    <input type="text" id="input" disabled={ALL.disable} className="text-black outline-none border-none rounded-md h-10 p-2 bg-slate-200 mb-2 font-semibold" value={ALL.input} onChange={(e: ChangeEvent<HTMLInputElement>) => { setALL({ ...ALL, input: e.target.value }) }} placeholder="Input New Password" />
                    <Button color="success" radius="sm" type="submit" isDisabled={ALL.disable} className="text-white text-lg">Submit</Button>
                </form>
            </Card>
        </>
    )
}

export default ResetPassword