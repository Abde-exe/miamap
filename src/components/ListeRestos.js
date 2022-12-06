import React from 'react';
import { Button, List, Typography } from 'antd';

const data = [
  { name: 'Resto Jap', distance: 5 },
  { name: 'Resto Viet', distance: 6 },
  { name: 'Resto Italien', distance: 2 },
];

export default function ListeRestos() {
  return (
    <>
      <List
        header={<h1>Liste Restos</h1>}
        //footer={<div>Footer</div>}
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            {item.name}
            <br />
            Distance :
            <Typography.Text mark> {item.distance} km</Typography.Text>
          </List.Item>
        )}
      />
    </>
  );
}
