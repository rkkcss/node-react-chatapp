import dayjs from "dayjs"
import { MessageType } from "../types/MessageType"
import { useAuth } from "../contexts/AuthContext"
import { Tooltip } from "antd"

type MessageProps = {
    message: MessageType,
    previousMessageTime?: Date,
}

const Message = ({ message, previousMessageTime }: MessageProps) => {
    const { user } = useAuth()

    const shouldShowTime = previousMessageTime
        ? Math.abs(dayjs(message.createdAt).diff(dayjs(previousMessageTime), 'minute')) > 5
        : true;

    const formatMessageTime = (timestamp: Date) => {
        const date = dayjs(timestamp)
        const now = dayjs()

        if (date.isSame(now, 'day')) {
            return date.format('HH:mm')
        } else if (date.isSame(now, 'week')) {
            return date.format('dddd HH:mm') // Pl. 'hétfő 13:42'
        } else {
            return date.format('YYYY.MM.DD HH:mm') // Pl. '2024.12.11 19:11'
        }
    }

    return (
        <div className="self-end w-full">
            {shouldShowTime && (
                <p className={`text-center text-xs text-alto-800`}>
                    {formatMessageTime(message.createdAt)}
                </p>
            )}

            <div className={`${user?.id == message.sender.id ? 'justify-end' : 'justify-start'} w-full flex `}>
                <Tooltip title={formatMessageTime(message.createdAt)} placement="left">
                    <div className={`${user?.id == message.sender.id ? 'bg-blue-600 text-white' : "bg-alto-200"} p-2 w-fit max-w-[564px] rounded-xl`}>
                        <p className="text-sm">
                            {message.text}
                        </p>
                    </div>
                </Tooltip>
            </div>
        </div>
    )
}

export default Message
