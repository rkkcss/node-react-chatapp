import { Empty } from 'antd'
import { useEffect, useRef } from 'react'
import Message from './Message'
import { MessageType } from '../types/MessageType'
import { BiMessageRoundedX } from 'react-icons/bi'
import { useChat } from '../contexts/ChatContext'
import { useParams } from 'react-router'
import { ChatRoomType } from '../types/ChatRoomType'

type MessagesAreaProps = {
    messages: MessageType[]
}

const MessagesArea = ({ messages }: MessagesAreaProps) => {
    const bottomRef = useRef<HTMLDivElement | null>(null);
    const { roomId } = useParams();
    const { chats } = useChat();
    const chat = chats.find(chat => chat.id === Number(roomId)) || {} as ChatRoomType;

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
                        previousMessageTime={index > 0 ? arr[index - 1].createdDate : undefined}
                        participants={chat.participants}
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