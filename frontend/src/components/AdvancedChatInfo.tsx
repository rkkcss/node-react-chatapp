import { useParams } from "react-router";
import { useChat } from "../contexts/ChatContext";
import { Avatar, Button, Collapse } from "antd";
import { FaChevronLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import ChatNameChangeModal from "./modals/ChatNameChangeModal";
import { ChatRoomType } from "../types/ChatRoomType";

type AdvancedChatInfoProps = {
    onClose: () => void;
}

const AdvancedChatInfo = ({ onClose }: AdvancedChatInfoProps) => {
    const { chats } = useChat();
    const { roomId } = useParams();
    const [chat, setChat] = useState<ChatRoomType>({} as ChatRoomType);
    const [changeNameModalOpen, setChangeNameModalOpen] = useState(false);

    useEffect(() => {
        const foundChat = chats.find((c) => String(c.id) === String(roomId));
        setChat(foundChat || ({} as ChatRoomType));
    }, [roomId, chats])

    const items = [
        {
            id: "1",
            label: (
                <p className="text-alto-950 font-semibold">Chat testreszabása</p>
            ),
            children: (
                <div className="flex flex-col gap-2">
                    {
                        chat.isGroupChat && (
                            <>
                                <Button type="text" className="w-full !text-xs !justify-start !text-alto-800 !p-0.5"
                                    onClick={() => setChangeNameModalOpen(true)}>
                                    Chat képének megváltoztatása
                                </Button>
                                <Button type="text" className="w-full !text-xs !justify-start !text-alto-800 !p-0.5"
                                    onClick={() => setChangeNameModalOpen(true)}>
                                    Chat nevének megváltoztatása
                                </Button>
                            </>
                        )
                    }
                </div>
            )
        }
    ]

    return (
        <>
            <ChatNameChangeModal
                chatName={chat.name}
                onClose={() => setChangeNameModalOpen(false)}
                open={changeNameModalOpen}
            />
            <div className="my-4 rounded-xl shadow-md flex flex-col w-full md:w-[250px] lg:w-[300px] mr-4 bg-white p-3">
                <Button
                    className={`${roomId && "md:!hidden !block"}`}
                    type="text"
                    shape="circle"
                    size="middle"
                    icon={<FaChevronLeft />}
                    onClick={onClose}
                />
                <div className="p-2 flex flex-col items-center justify-center mt-5 mb-6">
                    <Avatar src={`https://api.dicebear.com/9.x/initials/svg?seed=${chat.name}`} size="large" className="!mb-1" />
                    <p className="font-semibold text-alto-950">{chat.name}</p>
                </div>

                <Collapse items={items} defaultActiveKey={['1']} bordered={false} className="!bg-transparent" expandIconPosition="end" />
            </div>
        </>
    )
}

export default AdvancedChatInfo