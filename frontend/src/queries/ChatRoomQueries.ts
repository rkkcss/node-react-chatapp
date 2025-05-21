import { CreateChatRoomQueryType } from "../types/ChatRoomType";
import { API } from "../utils/API";

export const myChatQuery = () => {
    return API.get("/api/chat-rooms");
}

export const searchChatRoomsByUserIdsQuery = (userIds: number[]) => {
    const paramsSerializer = (params: Record<string, unknown>): string => {
        return Object.keys(params)
            .map(key => {
                const value = params[key];
                if (Array.isArray(value)) {
                    return value.map(v => `${encodeURIComponent(key)}=${encodeURIComponent(String(v))}`).join("&");
                }
                return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;
            })
            .join("&");
    };

    return API.get("/api/chat-rooms/by-users", {
        params: { userIds },
        paramsSerializer,
    });
};

export const createChatRoomQuery = (data: CreateChatRoomQueryType) => {
    return API.post("/api/chat-rooms", data);
}

export const updateChatRoomNameQuery = (roomId: number, name: string) => {
    return API.patch("/api/chat-rooms/chat-name", { id: roomId, name });
}