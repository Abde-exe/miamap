import { useContext } from "react";
import { List } from "antd";
import { SocketContext } from "../services/socket";

const ListUser = ({ users }) => {
  const { room } = useContext(SocketContext);
  return (
    <>
      <List
        header={<h1>Salle {room}</h1>}
        bordered
        dataSource={users}
        renderItem={(item) => (
          <List.Item>
            {item.name}
            <br />
            {/* Resaurant :<Typography.Text mark>{item.resto}</Typography.Text>
              <br />
              reste :<Typography.Text mark>{item.time} min</Typography.Text> */}
          </List.Item>
        )}
      />
    </>
  );
};

export default ListUser;
