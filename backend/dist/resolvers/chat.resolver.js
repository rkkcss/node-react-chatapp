"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = require("../prismaClient");
const auth_1 = require("../helpers/auth");
const chatResolver = {
    Mutation: {
        createChat: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            // Új chat létrehozása a résztvevőkkel
            const participants = args.participants.map(Number);
            console.log(args);
            console.log(participants);
            const newChat = yield prismaClient_1.prisma.chat.create({
                data: {
                    name: "name",
                    participants: {
                        create: participants.map((userId) => ({
                            user: {
                                connect: { id: userId }
                            }
                        }))
                    }
                },
                include: { participants: true } // Résztvevők visszaadása
            });
            return newChat;
        }),
        // sendMessage: async (_, { chatId, messageText }, { db }) => {
        //     // Logic to create a new message in the specified chat and return it
        //     const newMessage = await db.createMessage({ chatId, messageText });
        //     return newMessage;
        // }
    },
    Query: {
        getChats: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            if (!context.req.cookies.token) {
                throw new Error("You must be logged in to access this feature");
            }
            const user = (0, auth_1.verifyToken)(context.req.cookies.token);
            // Get all chats
            const chats = yield prismaClient_1.prisma.chat.findMany({
                where: {
                    participants: {
                        some: { userId: user === null || user === void 0 ? void 0 : user.id }
                    }
                },
                include: {
                    participants: {
                        include: { user: true }
                    }
                }
            });
            return chats;
        }),
        getChat: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            // Get a specific chat by its ID
            const chatId = args.chatId;
            const chat = yield prismaClient_1.prisma.chat.findUnique({
                where: { id: chatId },
                include: { participants: true } // Résztvevők visszaadása
            });
            return chat;
        })
    }
};
exports.default = chatResolver;
