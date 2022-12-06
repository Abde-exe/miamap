import { createContext, useEffect } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext({});

const SocketProvider = ({ room, pseudo, children }) => {
  const socket = io("http://localhost:9999/");

  const sio = {
    sendMessage: (action, value) => {
      socket.emit("send_message", { action, value });
    },
  };

  /**
  To get the number of clients connected to the room
  socket.on('update_number_user', (res) =>
    console.log(`${res} personne connecté à la session`),
  )
  */

  useEffect(() => {
    console.log(socket);
    socket.emit("join_room", room, (res) => {
      console.log(res.value);
    });

    return () => {
      socket.disconnect();
    };
  }, [room, socket]);

  return (
    <SocketContext.Provider value={{ socket, sio, pseudo, room }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
