import React from 'react';
import { List, Typography } from 'antd';

export default function ListeRestos({
  restosList,
  setSelectedResto,
  selectedResto,
}) {
  const onClickResto = (item) => {
    setSelectedResto(item);
    console.log('selected', selectedResto);
  };
  //console.log('test', selected);
  return (
    <>
      <List
        header={<h1>Liste Restos</h1>}
        bordered
        dataSource={restosList}
        renderItem={(item) => (
          <List.Item
            className={item.id == selectedResto.id ? 'selected' : ''}
            onClick={() => onClickResto(item)}
          >
            {item.name}
            <br />
          </List.Item>
        )}
      />
    </>
  );
}
