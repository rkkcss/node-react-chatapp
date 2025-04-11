import { Server } from "socket.io";
import http from "http";

export const initSocket = (server: http.Server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        console.log("Socket connected:", socket.id);

        socket.on("join-room", (roomId) => {
            socket.join(roomId);
            console.log(`Socket ${socket.id} csatlakozott a ${roomId} szobához`);
        });

        socket.on("leave-room", (roomId) => {
            socket.leave(roomId);  // A socket elhagyja a szobát
            console.log(`Socket ${socket.id} elhagyta a ${roomId} szobát`);
        });

        socket.on("sendMessage", ({ chatId, message }) => {
            io.to(`chat_${chatId}`).emit("receiveMessage", message);
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected:", socket.id);
        });
    });

    return io;
};
