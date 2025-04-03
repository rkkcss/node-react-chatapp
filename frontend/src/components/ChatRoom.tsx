import example from "../assets/react.svg"


const ChatRoom = () => {
    return (
        <div className="flex hover:bg-slate-200 rounded-lg p-2 cursor-pointer">
            <img className="rounded-full" src={example}></img>
            <div className="ml-4">
                <p className="text-sm text-gray-900 font-semibold">Chat Room</p>
                <p className="text-xs text-alto-800">This is a chat room.</p>
            </div>
        </div>
    )
}

export default ChatRoom