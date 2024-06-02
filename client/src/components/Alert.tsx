import { Divider, Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react"
import { ReactNode } from "react"

interface propType {
    title?: string,
    content?: string,
    open: boolean
    children?: ReactNode
}

function Alert({ title, content, open, children }: propType) {
    return (
        <>
            <Modal isOpen={open} hideCloseButton={true} >
                <ModalContent>
                    <ModalHeader className="pb-0">
                        <h1 className="text-xl font-semibold">{title}</h1>
                    </ModalHeader>
                    <Divider orientation="horizontal" className="w-[90%] mx-auto mt-1 pb-[3px]" />
                    <ModalBody>
                        <p>{content}</p>
                    </ModalBody>
                    {children}
                </ModalContent>
            </Modal>
        </>
    )
}

export default Alert