import axios, { AxiosResponse } from 'axios';

export default function DeleteData(modalDetailedNotesinputLabel: string) {
    const API_URL = import.meta.env.VITE_API_URL;
    axios.post(API_URL + 'note/delete-note', { label: modalDetailedNotesinputLabel }, { withCredentials: true })
        .then((response: AxiosResponse) => {
            if (response.data.success) {
                window.location.reload();
            }
        })
        .catch(() => {
            alert("Please Check Your Connection");
        })
}
