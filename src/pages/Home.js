import { useState, useEffect } from 'react';
import ListePersos from '../components/ListePersos';
import ListeRestos from '../components/ListeRestos';
import MapView from '../components/MapView';
import calculateTime from '../utils/calculateTime';
import calculateDistance from '../utils/calculateDistance';

const Home = () => {
  //pt d arrivee
  const [ptArrivee, setptArrivee] = useState([48.893537, 2.226961]);

  //data------------------------
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
  ];

  const [user, setuser] = useState({
    id: 1,
    name: 'Nico',
    position: [48.90114974975586, 2.2136828899383545],
    restoId: 1,
    distance: 0.4,
    time: 4.8,
  });

  const persos = [
    {
      id: 2,
      name: 'Alex',
      position: [48.898683545328545, 2.264794144566431],
    },
    {
      id: 3,
      name: 'Chachat',
      position: [48.89051539771106, 2.2364121181986674],
    },
  ];

  useEffect(() => {
    console.log('user', user);
    updateUserData(user);
  }, [ptArrivee]);

  const updateUserData = (user) => {
    let resto = restos.find((resto) => resto.id === user.id);
    console.log('resto', resto);

    let distanceToResto = calculateDistance(
      ...user.position,
      ...resto.position
    );
    let distanceToArrivee = calculateDistance(...resto.position, ...ptArrivee);
    let distanceTotale = distanceToResto + distanceToArrivee;

    let timeTotal = calculateTime(distanceTotale, 5);

    // setuser({ ...user, distance: distanceTotale });
  };
  //states------------------------
  const [restosList, setRestosList] = useState(restos);
  const [selectedResto, setSelectedResto] = useState(restosList[0]);
  const [persosList, setPersosList] = useState(persos);
  const [selectedPerso, setSelectedPerso] = useState(restosList[0]);

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ display: 'flex' }}>
          <ListeRestos
            restosList={restosList}
            setSelectedResto={setSelectedResto}
            selectedResto={selectedResto}
          />
          <MapView
            user={user}
            setuser={setuser}
            ptArrivee={ptArrivee}
            setptArrivee={setptArrivee}
            restosList={restosList}
            persosList={persosList}
            setSelectedResto={setSelectedResto}
            selectedResto={selectedResto}
          />
          <ListePersos
            persosList={persosList}
            setSelectedPerso={setSelectedPerso}
            selectedPerso={selectedPerso}
          />
        </div>
      </header>
    </div>
  );
};

export default Home;
