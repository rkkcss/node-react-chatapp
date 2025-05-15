import { Button } from 'antd'
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router'
import { useChat } from '../../contexts/ChatContext';
import ChatHeaderSkeleton from './ChatHeaderSkeleton';
import { useState } from 'react';
import ChatInfoModal from '../modals/ChatInfoModal';
import ChatInfoGroupChat from '../modals/ChatInfoGroupChat';
import dayjs from 'dayjs';
import { useAuth } from '../../contexts/AuthContext';
import { IoInformationCircleOutline } from 'react-icons/io5';

type ChatHeaderProps = {
    toggleAdvancedChatInfo: () => void;
}

const ChatHeader = ({ toggleAdvancedChatInfo }: ChatHeaderProps) => {
    const navigate = useNavigate();
    const { roomId } = useParams();
    const { chats } = useChat();
    const [infoModalOpen, setInfoModalOpen] = useState(false);
    const { user } = useAuth();

    const chat = chats.find((c) => String(c.id) === String(roomId));

    if (!chat) return <ChatHeaderSkeleton />

    const otherParticipant = chat.participants.find(
        (p) => p.user.id !== user?.id
    );


    return (
        <>
            {
                chat.isGroupChat ?
                    <ChatInfoGroupChat open={infoModalOpen}
                        onClose={() => setInfoModalOpen(false)}
                        participants={chat.participants}
                    />
                    :
                    <ChatInfoModal open={infoModalOpen}
                        onClose={() => setInfoModalOpen(false)}
                        participants={chat.participants}
                        isGroupChat={chat.isGroupChat}
                    />
            }

            <div className="p-2 border-b border-b-alto-200 flex items-center gap-2 justify-between">
                <Button
                    onClick={() => navigate("/c/chat")}
                    className={`${roomId && "md:!hidden !block"}`}
                    type="text"
                    shape="circle"
                    size="middle"
                    icon={<FaChevronLeft />}
                />
                <Button type="text" onClick={() => setInfoModalOpen(true)} className="flex-col !h-full flex !items-start !gap-0 rounded-lg ">
                    <p className="font-semibold text-alto-950">{chat.name}</p>
                    {
                        !chat.isGroupChat ?
                            <div className="flex items-center gap-1">

                                {otherParticipant?.user.online
                                    ?
                                    <>
                                        <p className="h-2 w-2 bg-green-500 rounded-full"></p>
                                        <p className="text-xs text-green-500">
                                            Online
                                        </p>
                                    </>
                                    :
                                    <>
                                        <p className="h-2 w-2 bg-alto-500 rounded-full"></p>
                                        <p className="text-xs text-alto-500">
                                            {dayjs(otherParticipant?.user.lastSeen).fromNow()}
                                        </p>
                                    </>
                                }

                            </div>
                            :
                            <p className="text-xs text-alto-500">Csoportos beszélgetés</p>
                    }
                </Button>

                <Button onClick={toggleAdvancedChatInfo} type="text" shape="circle">
                    <IoInformationCircleOutline className="text-alto-900" size={25} />
                </Button>
            </div>
        </>
    );
}

export default ChatHeader