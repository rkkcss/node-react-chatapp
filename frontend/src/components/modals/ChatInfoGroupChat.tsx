import { useState } from 'react'
import { ParticipantsType } from '../../types/ParticipantType'
import { Avatar, Badge, Dropdown, Modal } from 'antd'
import { useAuth } from '../../contexts/AuthContext'
import { IoIosMore } from "react-icons/io";
import { RiFileUserLine } from "react-icons/ri";
import { AiOutlineUserDelete } from 'react-icons/ai';

type ChatInfoGroupChatProps = {
    open: boolean
    onClose: () => void
    participants: ParticipantsType[]
}

const ChatInfoGroupChat = ({ open, onClose, participants }: ChatInfoGroupChatProps) => {
    const { user } = useAuth();
    const [isUserAdministrator] = useState(participants.find(p => p.user.id === user?.id)?.isAdmin);

    const items = [
        {
            key: '0',
            label:
                <div className="text-alto-900 flex items-center gap-2">
                    <RiFileUserLine size={22} />
                    <p>Profil megtekintés</p>
                </div>
        }
    ];

    if (isUserAdministrator) {
        items.unshift(
            {
                key: '1',
                label: <div className="text-red-600 hover:text-red-800 flex items-center gap-2">
                    <AiOutlineUserDelete size={22} />
                    <p>Eltávolítás a csoportból</p>
                </div>
            }
        );
    }

    return (
        <Modal onCancel={onClose} open={open} footer={null} title="Chat információk">
            <div className="flex flex-col gap-2 mt-4">
                {participants.map((participant) => (
                    <div key={participant.id} className="flex items-center gap-2 w-full">
                        <div className="flex items-center gap-2 w-full">
                            <Avatar src={`https://api.dicebear.com/9.x/initials/svg?seed=${participant.user.firstName + participant.user.lastName}`} size="small" />
                            <div className="flex">
                                <p className="text-alto-900 text-sm">{participant.user.firstName} {participant.user.lastName}</p>
                            </div>
                            {
                                participant.isAdmin &&
                                <Badge color="blue" count={"Adminisztrátor"} size="small" />
                            }
                        </div>
                        <Dropdown menu={{ items }} trigger={['click']}>
                            <a onClick={(e) => e.preventDefault()} className="cursor-pointer !text-alto-950 p-1 rounded-md hover:!bg-alto-100">
                                <IoIosMore strokeWidth={3} />
                            </a>
                        </Dropdown>
                    </div>
                ))}
            </div>
        </Modal>
    )
}

export default ChatInfoGroupChat