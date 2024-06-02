import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import { useNavigate } from "react-router-dom";
import Logout from "../icon/Logout";
import getUserGlobal from "../globalState/getUser";


interface TypeProps {
    isVisiblecheck: boolean;
    isVisiblenotLogged: boolean;
    onOpen: () => void
}

function Navbar({ isVisiblecheck, isVisiblenotLogged, onOpen }: TypeProps) {
    const { name, email, avatar } = getUserGlobal();
    const navigate = useNavigate();
    return (
        <>
            <nav className="flex justify-between bg-black/40 h-24 items-center text-white px-10">
                <h1 className="text-xl">LOGO</h1>
                <div style={{ display: isVisiblecheck ? "none" : "block" }}>
                    {
                        isVisiblenotLogged ?
                            (
                                <div className="flex gap-4 text-white">
                                    <Button className="w-24 h-12 text-base font-semibold bg-black/10 text-white" onClick={() => { navigate('/login') }}>Sign In</Button>
                                    <Button className="w-24 h-12 text-base font-semibold bg-black/10 text-white border-2 border-white/70" onClick={() => { navigate('/register') }}>Sign Up</Button>
                                </div>
                            )
                            :
                            <Dropdown placement="bottom-start" className="bg-slate-400" closeOnSelect={false} >
                                <DropdownTrigger>
                                    <Avatar
                                        isBordered
                                        as="button"
                                        className="transition-transform"
                                        size="lg"
                                        src={avatar}
                                    />
                                </DropdownTrigger>
                                <DropdownMenu aria-label="profil menu" variant="flat" className="w-80 h-80"
                                    itemClasses={{
                                        base: [
                                            "data-[hover=true]:bg-transparent",
                                            "cursor-default",
                                        ],
                                    }}
                                >
                                    <DropdownItem className="h-14 gap-2" textValue="*">
                                        <p className="font-medium">Signed in as</p>
                                        <p className="font-bold">{email}</p>
                                    </DropdownItem>
                                    <DropdownItem textValue="*">
                                        <Avatar
                                            as="button"
                                            className="transition-transform p-2 bg-transparent w-32 h-32 mx-auto"
                                            src={avatar}
                                        />
                                    </DropdownItem>
                                    <DropdownItem className="text-black p-2 text-center mt-[-25px]" textValue="*">
                                        <h1 className="text-xl font-semibold">Welcome,</h1>
                                        <span>{name || 'No Name'}</span>
                                    </DropdownItem>
                                    <DropdownItem className="text-black p-2 " textValue="*">
                                        <div className="flex justify-center w-full gap-[1px] h-16 text-white">
                                            <button className="flex justify-center items-center w-full rounded-l-full p-2 h-12 bg-black/30" onClick={() => { navigate('/profil') }}>Manage Your Account</button>
                                            <button className="w-full flex justify-evenly items-center gap-2 p-2 h-12 rounded-r-full bg-red-500" onClick={() => { onOpen() }}>Log Out <Logout /></button>
                                        </div>
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>}
                </div>
            </nav>
        </>
    )
}

export default Navbar