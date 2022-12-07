import { List } from "antd";
import React, { useContext } from "react";
import { SocketContext } from "../services/socket";

function ListePersos({ persosList, setSelectedPerso, selectedPerso }) {
  const { room } = useContext(SocketContext);

  const onClickPerso = (item) => {
    setSelectedPerso(item);
    console.log("selected", selectedPerso);
  };
  return (
    <>
      <List
        header={<h1>Salle {room}</h1>}
        bordered
        dataSource={persosList}
        renderItem={(item) => (
          <List.Item
            className={item.id == selectedPerso.id ? "selected" : ""}
            onClick={() => onClickPerso(item)}
          >
            {item.name}
            <br />
            {item.distance} km
            <br />
            {item.time} min
          </List.Item>
        )}
      />
    </>
  );
}

export default ListePersos;
