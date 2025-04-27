
import { useParams } from 'react-router'
import { useEffect } from 'react'
import ChatHeader from './ChatHeader'
import { useSocket } from '../contexts/SocketContext'
import MessagesArea from './MessagesArea'
import SendMessageArea from './SendMessageArea'
import { MessageType } from '../types/MessageType'

const ChatArea = () => {
    const { roomId } = useParams();

    const { socket } = useSocket();

    // const { data } = useQuery(GET_CHAT_MESSAGES, {
    //     variables: { chatId: Number(roomId), page: 1 },
    // });

    const handleReceiveMessage = (newMessage: MessageType) => {

    };

    useEffect(() => {
        joinRoom();

        if (!socket) return;

        // socket.on("receiveMessage", handleReceiveMessage);

        return () => {
            handleLeaveRoom();
        }
    }, [socket, roomId])

    const handleLeaveRoom = () => {
        if (socket) {
            // socket.emit("leave-room", `chat_${roomId}`);
            // socket.off("receiveMessage", handleReceiveMessage);
        }
    };

    const joinRoom = () => {
        if (socket) {
            // socket.emit("join-room", `chat_${roomId}`);
        }
    };

    return (
        <div className="my-4 rounded-xl border border-alto-200 flex flex-col flex-1 ml-3 mr-4 bg-white">
            <ChatHeader chatName={"chatName"} participants={[]} />
            <div className="overflow-y-scroll flex-1">
                <div className="pl-3 pr-1 gap-2 flex flex-col justify-end">
                    <MessagesArea messages={[]} />
                </div>
            </div>
            <div className="flex gap-3 p-3">
                <SendMessageArea roomId={Number(roomId)} />
            </div>

        </div>
    )
}

export default ChatArea