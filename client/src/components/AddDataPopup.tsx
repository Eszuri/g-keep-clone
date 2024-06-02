import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import axios, { AxiosResponse } from "axios";
import { ChangeEvent, useRef, useState } from "react";
import { toast } from "sonner";

interface TypeProps {
    modalInputNotesopen: boolean;
    getData: () => void;
    close: () => void;
}


export default function AddDataPopup({ modalInputNotesopen, getData, close }: TypeProps) {
    const API_URL = import.meta.env.VITE_API_URL;
    const textareaHeight = useRef<HTMLTextAreaElement>(null);
    const [modalInputNotes, setModalInputNotes] = useState({
        open: false,
        disable: false,
        inputLabel: '',
        inputContent: '',
        noNOTE: false,
        noPinned: false,
    });

    const addDataNOTE = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (modalInputNotes.inputLabel == "" || modalInputNotes.inputContent == "") {
            toast.error('Please fill input', {
                style: {
                    backgroundColor: 'rgb(201, 40, 40)',
                    color: "white"
                }
            });
        } else {
            setModalInputNotes({ ...modalInputNotes, disable: true });
            axios.post(API_URL + "note/add-note", { label: modalInputNotes.inputLabel, content: modalInputNotes.inputContent, updateDate: 0 }, { withCredentials: true })
                .then((response: AxiosResponse) => {
                    if (response.data.noUser) {
                        toast.error("user not found", {
                            style: {
                                backgroundColor: 'rgb(201, 40, 40)',
                                color: "white"
                            }
                        })
                    } else {
                        setModalInputNotes({ ...modalInputNotes, disable: false });
                        toast.success("Succes add note", {
                            style: {
                                backgroundColor: 'green',
                                color: "white"
                            }
                        });
                        return getData();
                    }
                })
                .catch(() => {
                    alert("Please Check Your Connection");
                })
        }
    };
    return (
        <>
            <Modal
                size="5xl"
                isOpen={modalInputNotesopen}
                hideCloseButton={true}
                scrollBehavior="outside"
                className='text-white'>
                <ModalContent className='bg-zinc-800'>
                    <ModalHeader className='flex flex-col mb-10'>
                        <h1>Add Notes</h1>
                        {/* <Divider className='h-[3px] bg-white/30' /> */}
                    </ModalHeader>
                    <form onSubmit={addDataNOTE}>
                        <ModalBody className="">
                            <label htmlFor="label">Label:</label>
                            <input type="text" disabled={modalInputNotes.disable} required={true} id="label" className=' outline-none text-white text-2xl border-white/30 focus:border-white/90 duration-200 border-b-2 font-semibold h-8 bg-transparent caret-slate-50' value={modalInputNotes.inputLabel} onChange={(e: ChangeEvent<HTMLInputElement>) => { setModalInputNotes({ ...modalInputNotes, inputLabel: e.target.value }) }} onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                if (e.key === "Enter" && textareaHeight.current && textareaHeight.current?.value.length > 0) {
                                    textareaHeight.current.focus();
                                    alert('msg');
                                }
                            }} />
                            <br />
                            <label htmlFor="label">Content:</label>
                            <textarea disabled={modalInputNotes.disable} required={true} id="label" className='h-6 max-h-60 outline-none text-white text-base border-white/30 focus:border-white/90 duration-200 border-b-2 font-semibold bg-transparent caret-slate-50' value={modalInputNotes.inputContent}
                                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                                    setModalInputNotes({ ...modalInputNotes, inputContent: e.target.value });
                                    if (textareaHeight.current) {
                                        textareaHeight.current.style.height = textareaHeight.current.scrollHeight + "px";
                                    }
                                }}
                                ref={textareaHeight} />
                        </ModalBody>
                        <ModalFooter className="">
                            <Button color='danger' onClick={close} isDisabled={modalInputNotes.disable}>Close</Button>
                            <Button type='submit' color='primary' isLoading={modalInputNotes.disable} spinner={
                                <svg
                                    className="animate-spin h-5 w-5 text-current"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        fill="currentColor"
                                    />
                                </svg>
                            }>Create</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal >
        </>
    )
}
