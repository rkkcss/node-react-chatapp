import { Server } from "socket.io";
import http from "http";
import { getUserFromContext } from "../helpers/auth";
import { prisma } from "../prismaClient";

export const initSocket = (server: http.Server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        const user = getUserFromContext(socket);

        console.log("Socket connected:", socket.id);

        socket.on("join-room", (roomId) => {
            socket.join(roomId);
            console.log(`Socket ${socket.id} csatlakozott a ${roomId} szobához`);
        });

        socket.on("leave-room", (roomId) => {
            socket.leave(roomId);
            console.log(`Socket ${socket.id} elhagyta a ${roomId} szobát`);
        });

        socket.on("sendMessage", async ({ chatId, message }) => {
            console.log("ÜZI", user)
            if (!user) {
                throw new Error("User not authenticated!");
            }
            const savedMessage = await prisma.message.create({
                data: {
                    text: message,
                    chatId,
                    senderId: user.id
                },
                include: {
                    sender: true
                }
            });

            io.to(`chat_${chatId}`).emit("receiveMessage", savedMessage);
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected:", socket.id);
        });
    });

    return io;
};
