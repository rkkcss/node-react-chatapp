// contexts/SocketContext.tsx
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useAuth } from "./AuthContext"; // már meglévő context
import { Client } from "webstomp-client"
// import SockJS from "sockjs-client";

type SocketContextType = {
    socket: Client | null;
    isConnected: boolean;
};

// const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

const SocketContext = createContext<SocketContextType>({
    socket: null,
    isConnected: false,
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();
    const socketRef = useRef<Client | null>(null);
    const [isConnected] = useState(false);

    useEffect(() => {
        // if (user && !socketRef.current) {
        //     const socket = new SockJS(`${SOCKET_URL}ws/connect`);
        //     const stompClient = over(socket);

        //     stompClient.connect({ "accept-version": "1.1,1.2" }, frame => {
        //         socketRef.current = stompClient;
        //         console.log("Websocket connected", frame);
        //         setIsConnected(true);
        //     })
        // }

        // if (!user && socketRef.current) {
        //     socketRef.current.disconnect();
        //     socketRef.current = null;
        // }

        // return () => {
        //     socketRef.current?.disconnect();
        // };
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
