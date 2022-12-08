import { List } from 'antd';
import { useContext } from 'react';
import { SocketContext } from '../services/socket';
import Profile from './Profile';

function ListePersos({ me, persosList }) {
  const { room } = useContext(SocketContext);
  return (
    <>
      <List
        header={
          me ? (
            <div>
              <h1>Salle {room}</h1>
              <br />
              <Profile user={me} size={100} />
            </div>
          ) : null
        }
        bordered
        dataSource={persosList}
        renderItem={(item) => (
          <List.Item>
            <Profile user={item} size={50} />
          </List.Item>
        )}
      />
    </>
  );
}

export default ListePersos;
