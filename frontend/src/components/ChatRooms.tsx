import { Button, Input } from 'antd'
import { TbZoom } from 'react-icons/tb'
import ChatRoom from './ChatRoom'
import { AiOutlineEdit } from 'react-icons/ai'
import { ChatRoomType } from '../types/ChatRoomType'
import { useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { myChatQuery } from '../queries/ChatRoomQueries'

const ChatRooms = () => {
    const navigate = useNavigate()
    const { roomId } = useParams();
    const [chats, setChats] = useState<ChatRoomType[]>([])

    useEffect(() => {
        myChatQuery().then(res => {
            setChats(res.data)
        })
    }, [])

    return (
        <div className={`my-4 max-w-[480px] ${roomId ? "hidden md:flex w-[300px]" : "flex w-full"} rounded-xl border border-alto-200 flex-col bg-white`}>
            <div className="p-3">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-2xl font-bold text-gray-700">Beszélgetések</h2>
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
                                <ChatRoom key={chatRoom.id} name={chatRoom.name} id={chatRoom.id} />
                            </li>
                        </>
                    ))
                }
            </ul>
        </div>
    )
}

export default ChatRooms