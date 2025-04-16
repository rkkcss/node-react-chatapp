import { Empty } from 'antd'
import { useEffect, useRef } from 'react'
import Message from './Message'
import { MessageType } from '../types/MessageType'
import { BiMessageRoundedX } from 'react-icons/bi'

type MessagesAreaProps = {
    messages: MessageType[]
}

const MessagesArea = ({ messages }: MessagesAreaProps) => {
    const bottomRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "auto" });
    }, [messages]);

    return (
        <>
            {
                messages?.length > 0 && [...messages].reverse().map((message: MessageType, index, arr) => (
                    <Message
                        key={message.id}
                        message={message}
                        previousMessageTime={index > 0 ? arr[index - 1].createdAt : undefined}
                    />
                )) ||
                <div className="flex items-center justify-center h-full">
                    <Empty
                        description={"Nincs üzenet!"}
                        image={<BiMessageRoundedX strokeWidth={0} size={70} className="text-alto-700" />}
                    />
                </div>
            }
            <div ref={bottomRef} />
        </>
    )
}

export default MessagesArea