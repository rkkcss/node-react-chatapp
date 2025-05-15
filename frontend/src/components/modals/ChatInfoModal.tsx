import { Avatar, Button, Modal } from "antd"
import { ParticipantsType } from "../../types/ParticipantType";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

type ChatInfoModalProps = {
    open: boolean;
    onClose: () => void;
    participants: ParticipantsType[];
    isGroupChat: boolean;
}

const ChatInfoModal = ({ onClose, open, participants, isGroupChat }: ChatInfoModalProps) => {
    const { user } = useAuth();
    const [userInParticipant] = useState(participants.find(p => p.user.id === user?.id)?.isAdmin);

    return (
        <Modal title={
            <p className="text-alto-950 text-xl">Résztvevők</p>
        }
            open={open}
            footer={null}
            onCancel={onClose}
        >
            <div className="flex flex-col gap-2 mt-4">
                {participants.map((participant) => (
                    <div key={participant.id} className="flex items-center gap-2">
                        <Avatar src={`https://api.dicebear.com/9.x/initials/svg?seed=${participant.user.firstName + participant.user.lastName}`} size="small" />
                        <div className="flex">
                            <p className="font-semibold text-sm">{participant.user.firstName} {participant.user.lastName}</p>
                        </div>
                    </div>
                ))}
            </div>
            {
                (isGroupChat && userInParticipant) &&
                <>
                    <Button
                        className="mt-4"
                        type="primary"
                    >Chat törlés</Button>
                </>
            }
        </Modal>
    )
}

export default ChatInfoModal