import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react"
import axios, { AxiosResponse } from "axios";

interface TypeProps {
    isOpen: any;
    onOpenChange: any;
}

function LogoutPopup({ isOpen, onOpenChange }: TypeProps) {
    const API_URL = import.meta.env.VITE_API_URL;
    const logout = async () => {
        await axios.get(API_URL + "api/logout", { withCredentials: true })
            .then((response: AxiosResponse) => {
                if (response.data.logout) {
                    window.location.reload();
                }
            })
            .catch(() => {
                alert("Please Check Your Connection");
            })
    };
    return (
        <>
            {/* logout component */}
            <Modal
                backdrop="opaque"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Logout</ModalHeader>
                            <ModalBody>
                                <h1>Do you want to log out?</h1>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={logout}>
                                    Yes
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default LogoutPopup;