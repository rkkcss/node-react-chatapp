import { Button, Input } from 'antd'
import { TbZoom } from 'react-icons/tb'
import ChatRoom from './ChatRoom'
import { AiOutlineEdit } from 'react-icons/ai'
import { gql, useQuery } from '@apollo/client'
import { ChatRoomType } from '../types/ChatRoomType'
import { useNavigate } from 'react-router'

const GET_CHATS = gql`
    query getChats {
        getChats {
            name
            id
            participants {
                user {
                    name
                }
            }
            
        }
    }
`

const ChatRooms = () => {
    const navigate = useNavigate()
    const { data } = useQuery(GET_CHATS);

    return (
        <div className="my-4 max-w-[480px] min-w-[300px] rounded-xl border border-alto-200 flex flex-col bg-white">
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
                    data?.getChats?.map((chatRoom: ChatRoomType) => (
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