import { List } from 'antd';
import React, { useContext } from 'react';
import { SocketContext } from '../services/socket';
function ListePersos({
  persosList,
  setSelectedPerso,
  selectedPerso,
  user,
  restosList,
}) {
  const { room } = useContext(SocketContext);

  const onClickPerso = (item) => {
    setSelectedPerso(item);
    console.log('selected', selectedPerso);
  };
  return (
    <>
      <List
        header={
          <div>
            <h1>Salle {room}</h1>
            <img width={50} src={require(`../assets/${user.icon}`)} />
            <br />
            <h2>{user.name}</h2>
          </div>
        }
        bordered
        dataSource={persosList}
        renderItem={(item) => (
          <List.Item onClick={() => onClickPerso(item)}>
            <img width={50} src={require(`../assets/${item.icon}`)} />
            <br />
            <h3>{item.name}</h3>
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
