import { ChatRoomType } from "./ChatRoomType"
import { UserType } from "./UserType"

export type MessageType = {
    id: number,
    text: string,
    createdAt: Date,
    sender: UserType
    chat: ChatRoomType
} 