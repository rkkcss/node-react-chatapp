import { Participants } from '../types/ParticipantType'

type ChatHeaderProps = {
    participants: Participants[]
    chatName: string
}

const ChatHeader = ({ chatName, participants }: ChatHeaderProps) => {

    return (
        <div className="p-2 border-b border-b-alto-200 ">
            <div className="p-2 rounded-lg hover:bg-alto-100 cursor-pointer w-fit">
                <p className="font-semibold">{chatName}</p>
                <div className="flex items-center gap-1 ">
                    <p className="h-2 w-2 bg-green-500 rounded-full"></p>
                    <p className="text-xs text-green-500">Most elérhető</p>
                </div>
            </div>
        </div>
    )
}

export default ChatHeader