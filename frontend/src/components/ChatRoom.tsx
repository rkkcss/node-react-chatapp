import { Link, useParams } from "react-router"
import { Avatar, Badge } from "antd"

type ChatRoomType = {
    name: string
    id: number
    unreadMessageCount: number
    lastMessageText?: string
    lastMessageTime?: Date
}

const ChatRoom = ({ name, id, unreadMessageCount, lastMessageText }: ChatRoomType) => {
    const { roomId } = useParams();

    return (
        <Link to={`/c/chat/${id}`} state={{ chatName: name }} className={`flex hover:bg-neutral-100 rounded-lg p-2 cursor-pointer ${Number(roomId) === id && "bg-neutral-100"}`}>
            <Avatar src={`https://api.dicebear.com/9.x/initials/svg?seed=${name}`} size="large" />
            <div className="ml-2">
                <p className="text-sm text-gray-900 font-semibold truncate max-w-[180px]">{name}</p>
                <p className="text-xs text-alto-800 truncate">{lastMessageText || "No message yet..."}</p>
            </div>

            {unreadMessageCount > 0 && (
                <div className="flex items-center justify-end grow">
                    <Badge count={unreadMessageCount} size="small"></Badge>
                </div>
            )
            }

        </Link >
    )
}

export default ChatRoom