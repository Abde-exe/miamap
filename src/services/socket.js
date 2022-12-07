import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { io } from "socket.io-client";

export const SocketContext = createContext({});
const socket = io("http://localhost:9999/");

const SocketProvider = ({ room, pseudo }) => {
  const [connected, setConnected] = useState(false);

  const sio = {
    sendMessage: (value) => {
      socket.emit("send_message", { pseudo, value });
    },

    sendArrivalPoint: (value) => {
      socket.emit("send_arrivalPoint", { pseudo, value });
    },

    sendArrivalTime: (value) => {
      socket.emit("send_arrivalTime", { pseudo, value });
    },

    sendMyData: (value) => {
      socket.emit("send_myData", { pseudo, value });
    },
  };

  useEffect(() => {
    socket.emit("join_room", room, (res) => {
      console.log(res.value);
      setConnected(true);
    });
  }, []);

  return (
    <SocketContext.Provider value={{ socket, sio, pseudo, room }}>
      {connected && <Outlet />}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
