
import { gql, useQuery } from '@apollo/client'
import Message from './Message'
import { Button, Input } from 'antd'
import { FiSend } from 'react-icons/fi'
import { useParams } from 'react-router'
import { MessageType } from '../types/MessageType'

const GET_MESSAGES = gql`
    query getMessages($chatId: Int!) {
        getMessages(chatId: $chatId) {
            id
            text
            createdAt
        }
    }
`;


const ChatArea = () => {
    const { roomId } = useParams();

    const { data } = useQuery(GET_MESSAGES, {
        variables: { chatId: Number(roomId) },
    });

    console.log(data)
    return (
        <div className="my-4 rounded-xl border border-alto-200 flex flex-col flex-1 ml-3 mr-4 bg-white">
            <div className="p-3">
                <p>Kis Ferike</p>
            </div>
            <div className="flex-1 overflow-y-auto pl-3 pr-1 flex-col gap-2 flex">
                {
                    data?.getMessages?.map((message: MessageType) => (
                        <Message key={message.id} message={message} />
                    )) || <p>Nincs üzenet</p>
                }
            </div>
            <div className="flex gap-3 p-3">
                <Input placeholder="Aa..." />
                <Button icon={<FiSend />} />
            </div>
        </div>
    )
}

export default ChatArea