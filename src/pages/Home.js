import { useState, useEffect, useContext } from 'react';
import ListePersos from '../components/ListePersos';
import ListeRestos from '../components/ListeRestos';
import MapView from '../components/MapView';
import calculateTime from '../utils/calculateTime';
import calculateDistance from '../utils/calculateDistance';
import { SocketContext } from '../services/socket';
import coGenerator from '../utils/coGenerator';
import SelectTime from '../components/SelectTime';

const restos = [
  {
    id: 1,
    name: 'Resto Jap',
    position: [48.89619150760733, 2.2232163600256305],
  },
  {
    id: 2,
    name: 'Resto Viet',
    position: [48.898683545328545, 2.264794144566431],
  },
  {
    id: 3,
    name: 'Resto Italien',
    position: [48.89051539771106, 2.2364121181986674],
  },
  {
    id: 4,
    name: 'Resto Français',
    position: [48.9072794528564, 2.2476304834099325],
  },
  {
    id: 5,
    name: 'Resto Burger',
    position: [48.88081050733152, 2.211126096065885],
  },
  {
    id: 6,
    name: 'Resto Mexicain',
    position: [48.885184588190384, 2.2769836445929403],
  },
];

const Home = () => {
  const { socket, sio, pseudo } = useContext(SocketContext);
  const [users, setUsers] = useState([]);
  const [me, setMe] = useState();
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
    socket.on('get_data', setData);

    return () => {
      socket.off('get_data', setData);
    };
  }, []);

  const updateUsersData = () => {
    let arr = [...users];

    const calcul = (user) => {
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
    };

    arr = arr.map((user) => {
      return calcul(user);
    });

    setUsers(arr);
    if (me !== undefined) {
      setMe(calcul(me));
    }
  };

  const updateArrivalPoint = ({ value }) => {
    setArrivalPoint(value);
  };

  useEffect(() => {
    socket.on('get_arrivalPoint', updateArrivalPoint);

    return () => {
      socket.off('get_arrivalPoint', updateArrivalPoint);
    };
  }, []);

  useEffect(() => {
    updateUsersData();
  }, [arrivalPoint]);

  const handleResto = (resto) => {
    let newMe = me;

    if (me === undefined) {
      newMe = {
        name: pseudo,
        position: coGenerator(48.893537, 2.226961, 2),
      };
    }

    let distanceToResto = calculateDistance(
      newMe.position[0],
      newMe.position[1],
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

    setMe({
      ...newMe,
      restoId: resto.id,
      distance: distanceTotale,
      time: timeTotal,
      restoName: resto.name,
    });

    sio.sendMyData({
      ...newMe,
      restoId: resto.id,
      distance: distanceTotale,
      time: timeTotal,
      restoName: resto.name,
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <SelectTime me={me} />
          <ListeRestos restosList={restos} handleResto={handleResto} me={me} />
          <MapView
            users={users}
            me={me}
            arrivalPoint={arrivalPoint}
            setArrivalPoint={setArrivalPoint}
            restosList={restos}
          />
          <ListePersos me={me} persosList={users} />
        </div>
      </header>
    </div>
  );
};

export default Home;
