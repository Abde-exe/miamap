import { List } from 'antd';
import React from 'react';

function ListePersos({ persosList, setSelectedPerso, selectedPerso }) {
  const onClickPerso = (item) => {
    setSelectedPerso(item);
    console.log('selected', selectedPerso);
  };
  return (
    <>
      <List
        header={<h1>Liste Persos</h1>}
        bordered
        dataSource={persosList}
        renderItem={(item) => (
          <List.Item
            className={item.id == selectedPerso.id ? 'selected' : ''}
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
