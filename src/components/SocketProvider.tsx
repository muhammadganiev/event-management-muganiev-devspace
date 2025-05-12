"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SocketContext = createContext<{ socket: Socket | null }>({
  socket: null,
});

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = io(
      process.env.NEXT_PUBLIC_WEBSOCKET_URL || "http://localhost:3001"
    );
    setSocket(socketInstance);
    socketInstance.on("connect", () => {});
    socketInstance.on("disconnect", () => {});
    socketInstance.on("eventChanged", () => {});
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext).socket;
