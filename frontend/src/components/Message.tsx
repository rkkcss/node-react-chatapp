import { MessageType } from "../types/MessageType"

type MessageProps = {
    message: MessageType,

}

const Message = ({ message }: MessageProps) => {
    return (
        <div className="self-end">
            <p className="text-right text-xs text-alto-800">10:00 AM</p>
            <div className="bg-blue-400 p-2 w-fit max-w-[564px] rounded-xl">

                <p className="text-sm text-gray-900">
                    {message.text}
                </p>

            </div>
        </div>
    )
}

export default Message