import { useState, useEffect, useContext } from "react";
import ListePersos from "../components/ListePersos";
import ListeRestos from "../components/ListeRestos";
import MapView from "../components/MapView";
import calculateTime from "../utils/calculateTime";
import calculateDistance from "../utils/calculateDistance";
import { SocketContext } from "../services/socket";
import soustractTime from "../utils/soustractTime";

const restos = [
  {
    id: 1,
    name: "Resto Jap",
    position: [48.89619150760733, 2.2232163600256305],
  },
  {
    id: 2,
    name: "Resto Viet",
    position: [48.898683545328545, 2.264794144566431],
  },
  {
    id: 3,
    name: "Resto Italien",
    position: [48.89051539771106, 2.2364121181986674],
  },
  {
    id: 4,
    name: "Resto Français",
    position: [48.9072794528564, 2.2476304834099325],
  },
  {
    id: 5,
    name: "Resto Burger",
    position: [48.88081050733152, 2.211126096065885],
  },
  {
    id: 6,
    name: "Resto Mexicain",
    position: [48.885184588190384, 2.2769836445929403],
  },
];

const Home = () => {
  const { socket, sio, pseudo } = useContext(SocketContext);
  const [users, setUsers] = useState([]);
  const [arrivalPoint, setArrivalPoint] = useState([48.893537, 2.226961]);

  const setData = ({ value }) => {
    const index = users.findIndex((u) => u.name === value.name);
    let newArr = [...users];
    if (index === -1) {
      newArr.push(value);
    } else {
      newArr[index] = value;
    }

    setUsers([...newArr]);
  };

  useEffect(() => {
    socket.on("get_data", setData);

    return () => {
      socket.off("get_data", setData);
    };
  }, []);

  const updateUsersData = () => {
    let arr = [...users];

    arr = arr.map((user) => {
      let resto = restos.find((resto) => resto.id === user.restoId);
      let distanceToResto = calculateDistance(
        user.position[0],
        user.position[1],
        resto.position[0],
        resto.position[1]
      );
      let distanceToArrivee = calculateDistance(
        resto.position[0],
        resto.position[1],
        arrivalPoint[0],
        arrivalPoint[1]
      );
      let distanceTotale = distanceToResto + distanceToArrivee;
      let timeTotal = calculateTime(distanceTotale, 5);

      return {
        ...user,
        distance: distanceTotale.toFixed(2),
        time: timeTotal,
      };
    });

    setUsers(arr);
  };

  const updateArrivalPoint = ({ value }) => {
    setArrivalPoint(value);
  };

  useEffect(() => {
    socket.on("get_arrivalPoint", updateArrivalPoint);

    return () => {
      socket.off("get_arrivalPoint", updateArrivalPoint);
    };
  }, []);

  useEffect(() => {
    if (users.length > 0) updateUsersData();
  }, [arrivalPoint]);

  const handleResto = (resto) => {
    const index = users.findIndex((user) => user.name === pseudo);
    let user = users[index];
    let newUsers = [...users];

    if (index === -1) {
      user = {
        name: pseudo,
        position: [48.90114974975586, 2.2136828899383545],
        icon: "perso1.png",
      };
    }

    let distanceToResto = calculateDistance(
      user.position[0],
      user.position[1],
      resto.position[0],
      resto.position[1]
    );
    let distanceToArrivee = calculateDistance(
      resto.position[0],
      resto.position[1],
      arrivalPoint[0],
      arrivalPoint[1]
    );
    let distanceTotale = distanceToResto + distanceToArrivee;
    let timeTotal = calculateTime(distanceTotale, 5);

    if (index === -1) {
      setUsers([
        ...users,
        {
          ...user,
          restoId: resto.id,
          distance: distanceTotale,
          time: timeTotal,
        },
      ]);
    } else {
      newUsers[index] = {
        ...user,
        restoId: resto.id,
        distance: distanceTotale,
        time: timeTotal,
      };
      setUsers(newUsers);
    }

    sio.sendMyData({
      ...user,
      restoId: resto.id,
      distance: distanceTotale,
      time: timeTotal,
    });
  };

  // useEffect(() => {
  //   console.log(users);
  // }, [users]);

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h3 style={{ position: "absolute", zIndex: 99 }}>
            Pour arriver à 13h : tu dois partir à{" "}
            {soustractTime(13, users.find((u) => u.name === pseudo)?.time ?? 0)}
          </h3>
          <ListeRestos
            restosList={restos}
            handleResto={handleResto}
            user={users.find((u) => u.name === pseudo)}
          />
          <MapView
            users={users}
            arrivalPoint={arrivalPoint}
            setArrivalPoint={setArrivalPoint}
            restosList={restos}
          />
          <ListePersos persosList={users} />
        </div>
      </header>
    </div>
  );
};

export default Home;
