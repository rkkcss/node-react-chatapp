import { Chat, Message } from "@prisma/client";
import { prisma } from "../prismaClient";
import { getUserFromContext } from "../helpers/auth";
import { CustomContext } from "..";
import { GraphQLDateTime } from "graphql-scalars";

const messageResolver = {
    DateTime: GraphQLDateTime,
    Query: {
        getMessages: async (_parent: any, { chatId }: { chatId: number }) => {
            return await prisma.message.findMany({
                where: { chatId },
                orderBy: { createdAt: "desc" },
                include: { sender: true }
            });
        },
    },
    Mutation: {
        sendMessage: async (_parent: any, { chatId, content }: { chatId: number, content: string }, context: CustomContext) => {
            const user = getUserFromContext(context);
            if (!user) {
                throw new Error("User not found!");
            }

            const message = await prisma.message.create({
                data: {
                    text: content,
                    chatId,
                    senderId: user.id
                },
                include: {
                    sender: true
                }
            });


            return message;
        }
    }
};

export default messageResolver;