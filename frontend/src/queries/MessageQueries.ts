import { API } from "../utils/API"


export const getMessagesByRoomId = (roomId: number, page: number) => {
    return API.get(`/api/messages/${roomId}`, {
        params: { page: page },
    })
}