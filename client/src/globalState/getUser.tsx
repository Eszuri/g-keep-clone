import { create } from "zustand";

interface UserState {
    name: string;
    email: string;
    avatar: string;
    data: any[];
    pinData: any[];
    setName: (name: string) => void;
    setEmail: (email: string) => void;
    setAvatar: (avatar: string) => void;
    setData: (data: any[]) => void;
    setPinData: (pinData: any[]) => void;
}

const getUserGlobal = create<UserState>((set) => ({
    name: "",
    email: "",
    avatar: "",
    data: [],
    pinData: [],
    setName: (name) => set({ name }),
    setEmail: (email) => set({ email }),
    setAvatar: (avatar) => set({ avatar }),
    setData: (data) => set({ data }),
    setPinData: (pinData) => set({ pinData }),
}));

export default getUserGlobal;