interface typeProp {
    open: boolean,
    text?: string
}

function Loading({ open, text = "Loading ..." }: typeProp) {
    return (
        <>
            <div className="text-white fixed w-full h-full top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-black/80 z-10 justify-center items-center flex-col gap-2 select-none"
                style={{ display: open ? "flex" : "none" }}
            >
                <div className="w-32 h-32 border-white/25 border-t-white border-[8px] rounded-full animate-spin"></div>
                <span className="text-2xl">{text}</span>
            </div>
        </>
    )
}

export default Loading