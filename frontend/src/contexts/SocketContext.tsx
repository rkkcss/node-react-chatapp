import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import Stomp, { Client, Subscription } from "webstomp-client";
import SockJS from 'sockjs-client';
import { MessageType } from "../types/MessageType";
import { useAuth } from "./AuthContext";

type SocketContextType = {
    socket: Client | null;
    isConnected: boolean;
    subscribeRoom: (roomId: number, messageHandler: (message: MessageType) => void) => void;
    unsubscribe: () => void
};

const SocketContext = createContext<SocketContextType>({
    socket: null,
    isConnected: false,
    subscribeRoom: () => { },
    unsubscribe: () => { }
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const stompClient = useRef<Client | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const subscription = useRef<Subscription | null>(null);
    const { user } = useAuth();

    useEffect(() => {
        let socket: WebSocket | null = null;

        const connect = () => {
            const headers = {};
            let url = `${import.meta.env.VITE_SOCKET_URL}/websocket/tracker`;
            const authToken = localStorage.getItem('jhi-authenticationToken') || sessionStorage.getItem('jhi-authenticationToken');
            if (authToken) {
                url += `?access_token=${authToken}`;
            }

            socket = new SockJS(url);
            stompClient.current = Stomp.over(socket, { protocols: ['v12.stomp'] });

            stompClient.current.connect(headers, () => {
                console.log('WebSocket connected.');
                setIsConnected(true);
            }, (error) => {
                console.error('WebSocket connection error:', error);
                setIsConnected(false);
            });
        };

        connect();

        return () => {
            if (stompClient.current && stompClient.current.connected) {
                stompClient.current.disconnect(() => {
                    console.log('WebSocket disconnected.');
                    setIsConnected(false);
                });
            }
        };
    }, [user]);

    const subscribeRoom = useCallback((roomId: number, messageHandler: (message: MessageType) => void) => {
        const trySubscribe = () => {
            if (stompClient.current && stompClient.current.connected) {
                const subroom = stompClient.current.subscribe(`/topic/${roomId}`, (message) => {
                    const body = JSON.parse(message.body);
                    messageHandler(body);
                });
                subscription.current = subroom;
                console.log("✅ Feliratkozva roomra:", roomId);
            } else {
                setTimeout(trySubscribe, 200);
            }
        };

        trySubscribe();
    }, []);


    const unsubscribeRoom = useCallback(() => {
        if (stompClient.current?.connected) {
            subscription.current?.unsubscribe();
        }
    }, []);

    return (
        <SocketContext.Provider
            value={{
                socket: stompClient.current,
                isConnected,
                subscribeRoom,
                unsubscribe: unsubscribeRoom
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};
