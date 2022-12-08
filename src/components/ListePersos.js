import { List } from "antd";
import React, { useContext } from "react";
import { SocketContext } from "../services/socket";
function ListePersos({ persosList }) {
  const { room } = useContext(SocketContext);
  return (
    <>
      <List
        header={
          <div>
            <h1>Salle {room}</h1>
            {/* <img width={50} src={require(`../assets/${user.icon}`)} /> */}
            <br />
            {/* <h2>{user.name}</h2> */}
          </div>
        }
        bordered
        dataSource={persosList}
        renderItem={(item) => (
          <List.Item>
            <img width={50} src={require(`../assets/${item.icon}`)} />
            <br />
            {item.name}
            <br />
            {item.distance} km
            <br />
            {item.time.toFixed(0)} h {((item.time % 1) * 60).toFixed(0)}
          </List.Item>
        )}
      />
    </>
  );
}

export default ListePersos;
