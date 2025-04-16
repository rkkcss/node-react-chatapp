// contexts/SocketContext.tsx
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "./AuthContext"; // már meglévő context

type SocketContextType = {
    socket: Socket | null;
    isConnected: boolean;
};

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

const SocketContext = createContext<SocketContextType>({
    socket: null,
    isConnected: false,
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();
    const socketRef = useRef<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (user && !socketRef.current) {
            const socket = io(SOCKET_URL, {
                withCredentials: true,
            });

            socket.on("connect", () => {
                console.log("✅ Socket connected");
                setIsConnected(true);
            });

            socket.on("disconnect", () => {
                console.log("❌ Socket disconnected");
                setIsConnected(false);
            });

            socketRef.current = socket;
        }

        if (!user && socketRef.current) {
            socketRef.current.disconnect();
            socketRef.current = null;
        }

        return () => {
            socketRef.current?.disconnect();
        };
    }, [user]);

    return (
        <SocketContext.Provider
            value={{
                socket: socketRef.current,
                isConnected,
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};
