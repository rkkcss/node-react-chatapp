import { Button, Input } from 'antd'
import { TbZoom } from 'react-icons/tb'
import ChatRoom from './ChatRoom'
import { AiOutlineEdit } from 'react-icons/ai'
import { ChatRoomType } from '../types/ChatRoomType'
import { useNavigate, useParams } from 'react-router'
import { useChat } from '../contexts/ChatContext'
import { useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'

const ChatRooms = () => {
    const navigate = useNavigate()
    const { roomId } = useParams();
    const { chats, queryChats } = useChat();
    const { user } = useAuth()

    useEffect(() => {
        queryChats()
    }, [])
    return (
        <div className={`my-4 max-w-[480px] ${roomId ? "hidden md:flex w-[300px]" : "flex w-full"} rounded-xl shadow-md flex-col bg-white`}>
            <div className="p-3">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-2xl font-bold text-alto-950">Beszélgetések</h2>
                    <Button icon={<AiOutlineEdit size={20} />}
                        type="text"
                        shape="circle"
                        onClick={() => navigate("/c/chat/new")}
                    />
                </div>
                <Input placeholder="Keresés a beszélgetések között..." prefix={<TbZoom />} />
            </div>
            <ul className="mt-4 overflow-y-auto overscroll-contain h-full pl-2.5 pr-1">
                {
                    chats?.map((chatRoom: ChatRoomType) => (
                        <>
                            <li>
                                <ChatRoom
                                    key={chatRoom.id}
                                    name={chatRoom.name}
                                    id={chatRoom.id}
                                    unreadMessageCount={chatRoom.participants.find(p => p.user.id === user?.id)?.unreadMessageCount || 0}
                                    lastMessageText={chatRoom.lastMessage?.text}
                                    lastMessageTime={chatRoom.lastMessage?.createdDate}
                                />
                            </li>
                        </>
                    ))
                }
            </ul>
        </div>
    )
}

export default ChatRooms