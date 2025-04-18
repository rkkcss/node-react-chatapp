
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router'
import { useEffect } from 'react'
import ChatHeader from './ChatHeader'
import { useSocket } from '../contexts/SocketContext'
import MessagesArea from './MessagesArea'
import SendMessageArea from './SendMessageArea'
import { GET_CHAT_MESSAGES } from '../queries/MessageQueries'
import { MessageType } from '../types/MessageType'
import { client } from '../main'

const ChatArea = () => {
    const { roomId } = useParams();

    const { socket } = useSocket();

    const { data } = useQuery(GET_CHAT_MESSAGES, {
        variables: { chatId: Number(roomId), page: 1 },
    });

    const handleReceiveMessage = (newMessage: MessageType) => {
        try {
            const existing = client.readQuery({
                query: GET_CHAT_MESSAGES,
                variables: { chatId: Number(roomId), page: 1 },
            }) as {
                getChatMessages: {
                    id: number;
                    name: string;
                    messages: MessageType[];
                };
            };
            console.log("UJ ÜZI", newMessage)
            if (existing) {
                client.writeQuery({
                    query: GET_CHAT_MESSAGES,
                    variables: { chatId: Number(roomId), page: 1 },
                    data: {
                        getChatMessages: {
                            ...existing.getChatMessages,
                            messages: [newMessage, ...existing.getChatMessages.messages]
                        },
                    },
                });
            }
            console.log("data", data)
        } catch (err) {
            console.error("Hiba a cache frissítésekor:", err);
        }
    };

    useEffect(() => {
        joinRoom();

        if (!socket) return;

        socket.on("receiveMessage", handleReceiveMessage);

        return () => {
            handleLeaveRoom();
        }
    }, [socket, roomId])

    const handleLeaveRoom = () => {
        if (socket) {
            socket.emit("leave-room", `chat_${roomId}`);
            socket.off("receiveMessage", handleReceiveMessage);
        }
    };

    const joinRoom = () => {
        if (socket) {
            socket.emit("join-room", `chat_${roomId}`);
        }
    };

    return (
        <div className="my-4 rounded-xl border border-alto-200 flex flex-col flex-1 ml-3 mr-4 bg-white">
            <ChatHeader chatName={data?.getChatMessages?.name} participants={data?.getChatMessages?.participants} />
            <div className="overflow-y-scroll flex-1">
                <div className="pl-3 pr-1 gap-2 flex flex-col justify-end">
                    <MessagesArea messages={data?.getChatMessages?.messages} />
                </div>
            </div>
            <div className="flex gap-3 p-3">
                <SendMessageArea roomId={Number(roomId)} />
            </div>

        </div>
    )
}

export default ChatArea