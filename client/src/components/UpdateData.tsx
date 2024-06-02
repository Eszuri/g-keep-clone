import axios, { AxiosResponse } from "axios";
import { toast } from "sonner";
const API_URL = import.meta.env.VITE_API_URL;


function setPinned(email: any, modalDetailedNotesorderArray: number, modalDetailedNotespinned: boolean, getData: () => void) {
    axios.post(API_URL + "note/pinned-note", { email: email, index: modalDetailedNotesorderArray, pinned: modalDetailedNotespinned })
        .then((response: AxiosResponse) => {
            if (response.data.success) {
                toast.success(`success ${modalDetailedNotespinned ? "unpinned" : "pinned"}`, {
                    style: {
                        backgroundColor: 'green',
                        color: "white"
                    }
                });
                getData();
            } else if (response.data.noUser) {
                toast.error("user not found", {
                    style: {
                        backgroundColor: 'rgb(201, 40, 40)',
                        color: "white"
                    }
                })
            }
        })
        .catch(() => {
            alert("Please Check Your Connection");
        })
};


function UpdateData(modalDetailedNotesinputLabel: string, modalDetailedNotesinputContent: string, modalDetailedNotesorderArray: number, getData: () => void) {
    axios.post(API_URL + "note/update-note", { label: modalDetailedNotesinputLabel, content: modalDetailedNotesinputContent, index: modalDetailedNotesorderArray }, { withCredentials: true })
        .then((response: AxiosResponse) => {
            if (response.data.noUser) {
                toast.error("user not found", {
                    style: {
                        backgroundColor: 'rgb(201, 40, 40)',
                        color: "white"
                    }
                })
            } else {
                toast.success("Success Updated", {
                    style: {
                        backgroundColor: 'green',
                        color: "white"
                    }
                });
                getData();
            }
        })
        .catch(() => {
            alert("Please Check Your Connection");
        })
};


export { setPinned, UpdateData };