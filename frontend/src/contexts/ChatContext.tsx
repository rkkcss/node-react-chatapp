// ChatContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';
import { ChatRoomType } from '../types/ChatRoomType';
import { myChatQuery } from '../queries/ChatRoomQueries';
import { MessageType } from '../types/MessageType';

type ChatContextType = {
    chats: ChatRoomType[];
    addChat: (chat: ChatRoomType) => void;
    queryChats: () => Promise<void>;
    setLastMessage: (chatId: number, message: MessageType) => void;
    setChatRoomName: (chatId: number, name: string) => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) throw new Error("useChat must be used within ChatProvider");
    return context;
};

export const ChatProvider = ({ children }: { children: ReactNode }) => {
    const [chats, setChats] = useState<ChatRoomType[]>([]);

    const queryChats = async () => {
        try {
            const response = await myChatQuery();
            setChats(response.data.content);
        } catch (error) {
            console.error("Error fetching chats:", error);
        }
    }

    const setLastMessage = (chatId: number, message: MessageType) => {
        setChats((prev) => {
            const chatIndex = prev.findIndex((chat) => chat.id === chatId);
            if (chatIndex === -1) return prev;

            const updatedChat = { ...prev[chatIndex], lastMessage: message };

            const updatedChats = [...prev];
            updatedChats.splice(chatIndex, 1);
            return [updatedChat, ...updatedChats];
        });
    };

    const setChatRoomName = (chatId: number, name: string) => {
        setChats((prev) => {
            const chatIndex = prev.findIndex((chat) => chat.id === chatId);
            if (chatIndex === -1) return prev;

            const updatedChat = { ...prev[chatIndex], name };

            const updatedChats = [...prev];
            updatedChats.splice(chatIndex, 1);
            return [updatedChat, ...updatedChats];
        });
    }

    const addChat = (chat: ChatRoomType) => {
        setChats((prev) => {
            if (prev.find((c) => c.id === chat.id)) return prev;
            return [chat, ...prev];
        });
    };

    return (
        <ChatContext.Provider value={{ chats, addChat, queryChats, setLastMessage, setChatRoomName }}>
            {children}
        </ChatContext.Provider>
    );
};
