import { List } from "antd";
import React, { useContext } from "react";
import { SocketContext } from "../services/socket";
import timeFormat from "../utils/timeFormat";

function ListePersos({ me, persosList }) {
  const { room } = useContext(SocketContext);
  return (
    <>
      <List
        header={
          me ? (
            <div>
              <h1>Salle {room}</h1>
              <img width={50} src={require("../assets/perso1.png")} />
              <br />
              <h2>{me?.name}</h2>
              <p>
                <strong> Distance : {me?.distance} km</strong>
              </p>
              <p>
                <strong>Reste : {timeFormat(me?.time)}</strong>
              </p>
            </div>
          ) : null
        }
        bordered
        dataSource={persosList}
        renderItem={(item) => (
          <List.Item>
            <img width={50} src={require("../assets/perso2.png")} />
            <br />
            {item.name}
            <br />
            {item.distance} km
            <br />
            {timeFormat(item.time)}
          </List.Item>
        )}
      />
    </>
  );
}

export default ListePersos;
