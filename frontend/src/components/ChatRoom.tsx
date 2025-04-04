import { Link, useParams } from "react-router"
import example from "../assets/react.svg"

type ChatRoomType = {
    name: string
    id: string
}

const ChatRoom = ({ name, id }: ChatRoomType) => {
    const { roomId } = useParams();

    return (
        <Link to={`/c/chat/${id}`} className={`flex hover:bg-slate-200 rounded-lg p-2 cursor-pointer ${roomId === id && "bg-gray-100"}`}>
            <img className="rounded-full" src={example}></img>
            <div className="ml-4">
                <p className="text-sm text-gray-900 font-semibold">{name}</p>
                <p className="text-xs text-alto-800">asdasd</p>
            </div>
        </Link>
    )
}

export default ChatRoom