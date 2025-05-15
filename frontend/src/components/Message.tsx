import dayjs from "dayjs"
import { MessageType } from "../types/MessageType"
import { useAuth } from "../contexts/AuthContext"
import { Avatar, Tooltip } from "antd"

type MessageProps = {
    message: MessageType,
    previousMessageTime?: Date,
    nextMessage?: MessageType,
    previousMessage?: MessageType
}

const Message = ({ message, previousMessageTime }: MessageProps) => {
    const { user } = useAuth()

    // Only show timestamp if more than 5 minutes have passed since previous
    const shouldShowTime = previousMessageTime
        ? Math.abs(dayjs(message.createdDate).diff(dayjs(previousMessageTime), 'minute')) > 5
        : true;

    const formatMessageTime = (timestamp: Date) => {
        const date = dayjs(timestamp)
        const now = dayjs()

        if (date.isSame(now, 'day')) {
            return date.format('HH:mm')
        } else if (date.isSame(now, 'week')) {
            return date.format('dddd HH:mm') // e.g. 'hétfő 13:42'
        } else {
            return date.format('YYYY.MM.DD HH:mm') // e.g. '2024.12.11 19:11'
        }
    }

    return (
        <div className="self-end w-full mb-1.5">
            {shouldShowTime && (
                <p className={`text-center text-xs text-alto-800`}>
                    {formatMessageTime(message.createdDate)}
                </p>
            )}

            <div className={`${user?.id == message.sender.id ? 'justify-end' : 'justify-start'} w-full flex relative`}>
                <Tooltip title={formatMessageTime(message.createdDate)} placement="left">
                    <div className={`${user?.id == message.sender.id ? 'bg-blue-600 text-white' : "bg-alto-100"} p-2 w-fit max-w-[564px] rounded-xl`}>
                        <p className="text-sm">
                            {message.text}
                        </p>
                    </div>
                </Tooltip>
            </div>
            <div className="w-full justify-end flex">
                <Avatar src={`https://api.dicebear.com/9.x/initials/svg?seed=${"asd"}`} className="!mb-1 !w-4 !h-4 " />
            </div>
        </div>
    )
}

export default Message;
