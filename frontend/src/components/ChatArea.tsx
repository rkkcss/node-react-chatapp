import { useParams } from 'react-router';
import { useEffect, useState, useRef, useCallback } from 'react';
import ChatHeader from './ChatHeader/ChatHeader';
import { useSocket } from '../contexts/SocketContext';
import MessagesArea from './MessagesArea';
import SendMessageArea from './SendMessageArea';
import { MessageType } from '../types/MessageType';
import { getMessagesByRoomId } from '../queries/MessageQueries';
import { useChat } from '../contexts/ChatContext';
import AdvancedChatInfo from './AdvancedChatInfo';

const ChatArea = () => {
    const { roomId } = useParams();
    const { isConnected, subscribeRoom, unsubscribe } = useSocket();
    const [messages, setMessages] = useState<MessageType[]>([]);
    const currentRoom = useRef<string | null>(null);
    const { setLastMessage } = useChat();
    const [toggleAdvancedChatInfo, setToggleAdvancedChatInfo] = useState(false);

    const getAllMessages = useCallback(() => {
        getMessagesByRoomId(Number(roomId), 0).then((res) => {
            setMessages(res.data);
        });
    }, [roomId])

    useEffect(() => {
        if (isConnected && roomId) {
            if (currentRoom.current && currentRoom.current !== roomId) {
                console.log("💥 Unsub from", currentRoom.current);
                unsubscribe();
            }

            console.log("📡 Sub to", roomId);
            subscribeRoom(Number(roomId), handleReceivedMessage);
            getAllMessages();
            currentRoom.current = roomId;
        }

        return () => {
            console.log("🟡 Component unmount");
            unsubscribe();
        };
    }, [roomId, isConnected, subscribeRoom, unsubscribe, getAllMessages]);

    const handleReceivedMessage = (message: MessageType) => {
        setMessages((prev) => [message, ...prev]);
        setLastMessage(Number(roomId), message)
    };

    return (
        <>
            <div className={`${toggleAdvancedChatInfo && "hidden md:flex"} 
                my-4 rounded-xl shadow-md flex flex-col flex-1 bg-white`}>
                <ChatHeader toggleAdvancedChatInfo={() => setToggleAdvancedChatInfo(!toggleAdvancedChatInfo)} />
                <div className="overflow-y-scroll flex-1">
                    <div className="pl-3 pr-1 flex flex-col justify-end">
                        <MessagesArea messages={messages} />
                    </div>
                </div>
                <div className="flex gap-2 p-3">
                    <SendMessageArea roomId={Number(roomId)} />
                </div>
            </div>
            {
                toggleAdvancedChatInfo &&
                <AdvancedChatInfo onClose={() => setToggleAdvancedChatInfo(false)} />
            }
        </>
    );
};

export default ChatArea;
