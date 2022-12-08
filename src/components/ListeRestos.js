import { List } from "antd";

export default function ListeRestos({ restosList, handleResto, me }) {
  return (
    <>
      <List
        header={<h1>Liste Restos</h1>}
        bordered
        dataSource={restosList}
        renderItem={(item) => (
          <List.Item
            className={me && item.id === me.restoId ? "selected" : ""}
            onClick={() => handleResto(item)}
          >
            <h3 className={me && item.id === me.restoId ? "selected" : ""}>
              {item.name}
            </h3>
            <br />
          </List.Item>
        )}
      />
    </>
  );
}
