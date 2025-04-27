import { API } from "../utils/API";

export const myChatQuery = () => {
    return API.get("/api/chats");
}