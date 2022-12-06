import { createContext, useEffect } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext({});

const SocketProvider = ({ room, pseudo, children }) => {
  const socket = io(process.env.REACT_APP_SOCKET);

  const sio = {
    // updateSlide: (action, value, prevSlide) => {
    //   socket.emit('update_slide', { action, value, prevSlide })
    // }
  };

  /**
  To get the number of clients connected to the room
  socket.on('update_number_user', (res) =>
    console.log(`${res} personne connecté à la session`),
  )
  */

  useEffect(() => {
    socket.emit("join_room", room, (res) => {
      console.log(res.value);
    });

    return () => {
      socket.disconnect();
    };
  }, [sio]);

  return (
    <SocketContext.Provider value={{ socket, sio, pseudo, room }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
