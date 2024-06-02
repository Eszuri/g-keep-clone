import { Button, Divider, } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { ChangeEvent, useEffect, useRef, useState } from "react"
import GetData from "../api/GetData";
import { Toaster } from "sonner";
import Alert from "../components/Alert";
import Trash from "../icon/Trash";
import { IsPinned, NoPin } from "../icon/Pin";
import getUserGlobal from "../globalState/getUser";
import Navbar from "../components/Navbar";
import LogoutPopup from "../components/LogoutPopup";
import AddDataPopup from "../components/AddDataPopup";
import MappingData from "../components/MappingData";
import { setPinned, UpdateData } from "../components/UpdateData";
import DeleteData from "../components/DeleteData";
import { Helmet } from "react-helmet-async";


interface modalDetailedNotesState {
    open: boolean;
    disable: boolean;
    confirm: boolean;
    updateBtnDisplay: boolean;
    orderArray: Number | any;
    pinned: Boolean | any;
    inputLabel: string;
    inputContent: string;
    inputContentRows: number | any;
    alertTitle: string;
    alertContent: string;
    alertChildren: React.ReactNode;
};


export default function Root() {
    const { setName, setEmail, setAvatar, setData, setPinData } = getUserGlobal();
    const textareaHeight = useRef<HTMLTextAreaElement>(null);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isVisible, setisVisible] = useState({
        check: true,
        notLogged: true,
    })
    const [user, setuser] = useState({
        email: "",
        avatar: "",
        name: "",
        data: [Array],
        pinData: [Array]
    });
    const [modalInputNotes, setModalInputNotes] = useState({
        open: false,
        disable: false,
        noNOTE: false,
        noPinned: false,
    });
    const [modalDetailedNotes, setModalDetailedNotes] = useState<modalDetailedNotesState>({
        open: false,
        disable: false,
        confirm: false,
        updateBtnDisplay: false,
        orderArray: null,
        pinned: null,
        inputLabel: '',
        inputContent: '',
        inputContentRows: 1,
        alertTitle: '',
        alertContent: '',
        alertChildren: null
    });

    // check if login or not
    function getData() {
        GetData(() => {
            setisVisible({ check: false, notLogged: true });
        }, () => {
            setisVisible({ check: false, notLogged: true });
        }, (response) => {
            setisVisible({ check: false, notLogged: false });
            if (Object.keys(response.data).length === 0 || response.data.length === 0) {
                setuser({ email: response.email, avatar: response.avatar, name: response.name, data: [], pinData: [] });
                setModalInputNotes({ ...modalInputNotes, noNOTE: true, noPinned: true });
            } else {
                const getNOTE: any = response.data;
                // const filter = getNOTE.filter((item: any) => 'pinned' in item);
                const filterPin = getNOTE.filter((item: any) => item.pinned == true);
                // const filterDate = getNOTE.filter((item: any) => item.updateDate === 0);
                if (filterPin.length == 0) {
                    setModalInputNotes({ ...modalInputNotes, noNOTE: false, open: false, noPinned: true })
                } else {
                    setModalInputNotes({ ...modalInputNotes, noNOTE: false, open: false, noPinned: false })
                };
                setuser({ email: response.email, avatar: response.avatar, name: response.name, data: response.data, pinData: filterPin });
                setName(response.name);
                setEmail(response.email);
                setAvatar(response.avatar);
                setData(response.data);
                setPinData(filterPin);
            }
        });
    }
    useEffect(() => {
        getData()
    }, [])




    return (
        <>
            <Helmet>
                <title>Penyimpan Catatan</title>
                <meta name="description" content="Menyimpan Catatan anda disini" />
            </Helmet>
            <Toaster visibleToasts={1} duration={4000} position="bottom-center" />
            <Navbar isVisiblecheck={isVisible.check} isVisiblenotLogged={isVisible.notLogged} onOpen={() => { onOpen() }} />
            <LogoutPopup isOpen={isOpen} onOpenChange={onOpenChange} />


            <AddDataPopup modalInputNotesopen={modalInputNotes.open} close={() => { setModalInputNotes({ ...modalInputNotes, open: false }) }} getData={() => { getData() }} />

            <Alert open={modalDetailedNotes.confirm} title={modalDetailedNotes.alertTitle} content={modalDetailedNotes.alertContent}>
                {modalDetailedNotes.alertChildren}
            </Alert>


            <Modal size="full" isOpen={modalDetailedNotes.open} hideCloseButton={true} className='text-white' >
                <ModalContent className="bg-zinc-800">
                    <ModalHeader>
                        <div className="w-full flex justify-center gap-3">
                            <button className="hover:bg-slate-500 w-12 h-11 flex justify-center items-center  rounded p-2 cursor-pointer duration-250" onClick={() => { setPinned(user.email, modalDetailedNotes.orderArray, modalDetailedNotes.pinned, () => { getData(); setModalDetailedNotes({ ...modalDetailedNotes, pinned: !modalDetailedNotes.pinned }); }); }}
                            >{modalDetailedNotes.pinned ? <IsPinned /> : <NoPin />}</button>
                            <span className="hover:bg-slate-500 w-12 h-11 flex justify-center items-center rounded p-2 cursor-pointer duration-250" onClick={() => {
                                setModalDetailedNotes({
                                    ...modalDetailedNotes, confirm: true, alertTitle: "Are You Delete?", alertContent: "Your Agree?",
                                    alertChildren: (
                                        <div className="flex my-3 mx-2 justify-center gap-2">
                                            <Button radius="sm" className="w-full text-lg font-semibold text-white" color="danger" onClick={() => { setModalDetailedNotes({ ...modalDetailedNotes, confirm: false, }) }}>No</Button>
                                            <Button radius="sm" className="w-full text-lg font-semibold text-white" color="success" onClick={() => { DeleteData(modalDetailedNotes.inputLabel) }}>Yes</Button>
                                        </div>)
                                })
                            }}><Trash /></span>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <label htmlFor="label">Label:</label>
                        <input type="text" disabled={modalInputNotes.disable} required={false} id="label" className=' outline-none text-white text-2xl border-white/30 focus:border-white/90 duration-200 border-b-2 font-semibold h-8 bg-transparent caret-slate-50' value={modalDetailedNotes.inputLabel} onChange={(e: ChangeEvent<HTMLInputElement>) => { setModalDetailedNotes({ ...modalDetailedNotes, inputLabel: e.target.value, updateBtnDisplay: true }) }} />
                        <br />
                        <label htmlFor="label">Content:</label>
                        <textarea rows={modalDetailedNotes.inputContentRows} ref={textareaHeight} disabled={modalInputNotes.disable} required={false} id="label" className='h-auto min-h-6 max-h-80 outline-none text-white text-base border-white/30 focus:border-white/90 duration-200 border-b-2 font-semibold bg-transparent caret-slate-50' value={modalDetailedNotes.inputContent} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                            setModalDetailedNotes({ ...modalDetailedNotes, inputContent: e.target.value, updateBtnDisplay: true });
                            if (textareaHeight.current) {
                                textareaHeight.current.style.height = textareaHeight.current.scrollHeight + "px";
                            }
                        }} />
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            isLoading={modalDetailedNotes.disable} style={{ display: modalDetailedNotes.updateBtnDisplay ? "flex" : 'none' }}
                            spinner={<svg className="animate-spin h-5 w-5 text-current" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor" /></svg>}
                            variant="shadow"
                            color="success"
                            className="text-white"
                            type="button"
                            onClick={() => { setModalDetailedNotes({ ...modalDetailedNotes, disable: true }); UpdateData(modalDetailedNotes.inputLabel, modalDetailedNotes.inputContent, modalDetailedNotes.orderArray, () => { getData(); setModalDetailedNotes({ ...modalDetailedNotes, updateBtnDisplay: false }); }); }}
                        >Save Updated</Button>
                        <Button onClick={() => { setModalDetailedNotes({ ...modalDetailedNotes, open: false, updateBtnDisplay: false }) }}>Close</Button>
                    </ModalFooter>
                </ModalContent >
            </Modal >





            {
                isVisible.notLogged ?
                    <div style={{ display: isVisible.check ? "none" : "block" }} className="text-white absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
                        <h1 className="text-lg font-semibold tracking-wider">you are not logged in, please log in first</h1>
                    </div>
                    :
                    <div >
                        <div className="mb-20" style={{ display: isVisible.check ? "none" : "block" }}> <br />
                            <span className="text-white ml-3">Pinned ⭐</span>
                            <Divider className="bg-white/30 w-[90%] ml-3" />
                            {modalInputNotes.noPinned ? (<span className="text-white text-center w-full inline-block mt-10 text-lg font-semibold">The data is empty</span>) : ('')}
                            <div className="gap-2 grid grid-cols-1 sm:grid-cols-2 mx-5 mt-5">
                                {user.pinData.map((item: any, index) => (
                                    <MappingData key={index} item={item} index={index} action={() => { setModalDetailedNotes({ ...modalDetailedNotes, open: true, inputLabel: item.label, inputContent: item.content, orderArray: index, pinned: item.pinned }) }} />
                                ))}
                            </div>
                            <span className="text-white ml-3">All Noted</span>
                            <Divider className="bg-white/30 w-[90%] ml-3" />
                            {modalInputNotes.noNOTE ? (<span className="text-white text-center w-full inline-block mt-10 text-lg font-semibold">The data is empty</span>) : ('')}
                            <div className="gap-2 grid grid-cols-1 sm:grid-cols-2 mx-5 mt-5">
                                {user.data.map((item: any, index) => (
                                    <MappingData key={index} item={item} index={index} action={() => {
                                        setModalDetailedNotes({ ...modalDetailedNotes, open: true, inputLabel: item.label, inputContent: item.content, orderArray: index, pinned: item.pinned, inputContentRows: item.content.split('\n').length });
                                        if (textareaHeight.current) {
                                            textareaHeight.current.style.height = 'auto';
                                            textareaHeight.current.style.height = textareaHeight.current.scrollHeight + "px";
                                        }
                                    }} />
                                ))}
                            </div>
                        </div>


                        <div className="fixed bottom-5 right-10">
                            <span
                                onClick={() => { setModalInputNotes({ ...modalInputNotes, open: true }) }}
                                className="scale-[1.8] cursor-pointer active:scale-[1.85] w-10 h-10 bg-teal-800 text-white flex justify-center items-center rounded-full">+</span>
                        </div>
                    </div>
            }
        </>
    )
}