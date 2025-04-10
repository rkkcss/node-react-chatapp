
import { gql, useMutation, useQuery } from '@apollo/client'
import Message from './Message'
import { Button, Empty, Input } from 'antd'
import { FiSend } from 'react-icons/fi'
import { useParams } from 'react-router'
import { MessageType } from '../types/MessageType'
import { useEffect, useRef, useState } from 'react'
import { BiMessageRoundedX } from 'react-icons/bi'
import ChatHeader from './ChatHeader'

const GET_CHAT_MESSAGES = gql`
    query getChatMessages($chatId: Int!, $page: Int!) {
        getChatMessages(chatId: $chatId, page: $page) {
            name
            id
            participants {
                id
                user {
                    name
                }
            }
            messages {
                id
                text
                sender {
                    id
                }
                createdAt
            }
        }
    }
`;

const SEND_MESSAGE = gql`
    mutation sendMessage($content: String!, $chatId: Int!) {
        sendMessage(content: $content, chatId: $chatId) {
            id
            createdAt
            text
            sender {
                id
            }
        }
    }
`

const ChatArea = () => {
    const { roomId } = useParams();
    const [message, setMessage] = useState<string>("");
    const bottomRef = useRef<HTMLDivElement | null>(null);

    const [sendMessage] = useMutation(SEND_MESSAGE, {
        onCompleted: () => {
            setMessage("");
        },
        update(cache, { data: { sendMessage } }) {
            const existing = cache.readQuery({
                query: GET_CHAT_MESSAGES,
                variables: { chatId: Number(roomId), page: 1 },
            }) as {
                getChatMessages: {
                    id: number;
                    name: string;
                    messages: MessageType[];
                };
            };

            if (existing) {
                cache.writeQuery({
                    query: GET_CHAT_MESSAGES,
                    variables: { chatId: Number(roomId), page: 1 },
                    data: {
                        getChatMessages: {
                            ...existing.getChatMessages,
                            messages: [
                                sendMessage,
                                ...existing.getChatMessages.messages,

                            ],
                        },
                    },
                });
            }
        }

    });

    const { data } = useQuery(GET_CHAT_MESSAGES, {
        variables: { chatId: Number(roomId), page: 1 },
    });

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "auto" });
    }, [data?.getChatMessages?.messages]);

    console.log(data)
    return (
        <div className="my-4 rounded-xl border border-alto-200 flex flex-col flex-1 ml-3 mr-4 bg-white">
            <ChatHeader chatName={data?.getChatMessages?.name} participants={data?.getChatMessages?.participants} />
            <div className="overflow-y-scroll flex-1">
                <div className="pl-3 pr-1 gap-2 flex flex-col justify-end">
                    {
                        data?.getChatMessages.messages.length > 0 && [...data.getChatMessages.messages].reverse().map((message: MessageType, index, arr) => (
                            <Message
                                key={message.id}
                                message={message}
                                previousMessageTime={index > 0 ? Number(arr[index - 1].createdAt) : undefined}
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
                </div>
            </div>
            <div className="flex gap-3 p-3">
                <Input placeholder="Aa..." value={message} onChange={(e) => { setMessage(e.target.value) }} />
                <Button icon={<FiSend />} onClick={() => sendMessage({ variables: { content: message, chatId: Number(roomId) } })} />
            </div>
        </div>
    )
}

export default ChatArea