import { verify } from "jsonwebtoken";
import { prisma } from "../prismaClient";
import { getUserFromContext, verifyToken } from "../helpers/auth";
import { CustomContext } from "..";

type GetChatMessagesType = {
    chatId: number;
    page: number;
}

const chatResolver = {
    Mutation: {
        createChat: async (_: any, args: { participants: number[] }) => {
            // Új chat létrehozása a résztvevőkkel
            const participants = args.participants.map(Number);
            console.log(args)
            console.log(participants)
            const newChat = await prisma.chat.create({
                data: {
                    name: "name",
                    participants: {
                        create: participants.map((userId: number) => ({
                            user: {
                                connect: { id: userId }
                            }
                        }))
                    }
                },
                include: { participants: true } // Résztvevők visszaadása
            });

            return newChat;
        }
        // sendMessage: async (_, { chatId, messageText }, { db }) => {
        //     // Logic to create a new message in the specified chat and return it
        //     const newMessage = await db.createMessage({ chatId, messageText });
        //     return newMessage;
        // }
    },
    Query: {
        getChatMessages: async (_: any, { chatId, page }: GetChatMessagesType, context: CustomContext) => {
            const user = getUserFromContext(context);
            if (!user) {
                throw new Error("User not authenticated!")
            }

            const skip = (page - 1) * 40;

            const totalMessages = await prisma.message.count({
                where: { chatId },
            });

            const chat = await prisma.chat.findUnique({
                where: { id: chatId },
                select: {
                    id: true,
                    name: true,
                    participants: {
                        select: {
                            id: true,
                            user: {
                                select: {
                                    id: true,
                                    name: true
                                }
                            }
                        }
                    },
                    messages: {
                        orderBy: { createdAt: "desc" },
                        skip,
                        take: 40,
                        include: {
                            sender: true,
                        },
                    },
                },
            });

            return {
                ...chat,
                totalCount: totalMessages,
                hasNextPage: skip + 40 < totalMessages,
                hasPreviousPage: skip > 0,
            };
        },
        getChats: async (_: any, args: any, context: any) => {
            if (!context.req.cookies.token) {
                throw new Error("You must be logged in to access this feature");
            }
            const user = verifyToken(context.req.cookies.token)
            // Get all chats
            const chats = await prisma.chat.findMany({
                where: {
                    participants: {
                        some: { userId: user?.id }
                    }
                },
                include: {
                    participants: {
                        include: { user: true }
                    }
                }
            });
            return chats;
        },
        getChat: async (_: any, args: { chatId: number }) => {
            // Get a specific chat by its ID
            const chatId = args.chatId;
            const chat = await prisma.chat.findUnique({
                where: { id: chatId },
                include: { participants: true } // Résztvevők visszaadása
            });
            return chat;
        }
    }
}

export default chatResolver;