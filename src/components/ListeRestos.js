import { List } from "antd";

export default function ListeRestos({ restosList, handleResto, user }) {
  return (
    <>
      <List
        header={<h1>Liste Restos</h1>}
        bordered
        dataSource={restosList}
        renderItem={(item) => (
          <List.Item
            className={user && item.id === user.restoId ? "selected" : ""}
            onClick={() => handleResto(item)}
          >
            <h3 className={user && item.id === user.restoId ? "selected" : ""}>
              {item.name}
            </h3>
            <br />
          </List.Item>
        )}
      />
    </>
  );
}
