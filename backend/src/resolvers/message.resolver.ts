import { Chat, Message } from "@prisma/client";
import { prisma } from "../prismaClient";

const messageResolver = {
    Query: {
        getMessages: async (_parent: any, { chatId }: { chatId: number }) => {
            return await prisma.message.findMany({
                where: { chatId },
                orderBy: { createdAt: "desc" },
            });
        },
    },
};

export default messageResolver;