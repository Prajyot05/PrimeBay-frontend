import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

// Define the shape of the context
interface SocketContextType {
  socket: Socket | null;
}

// Create the context
const SocketContext = createContext<SocketContextType>({ socket: null });

// Provider component
export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Connect to the Socket.IO server
    const socketInstance = io("http://localhost:3000");
    setSocket(socketInstance);

    // Clean up the socket connection on unmount
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

// Custom hook for accessing the context
export const useSocket = () => useContext(SocketContext);