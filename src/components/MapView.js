import { useContext, useMemo, useRef, useState } from 'react';
import './styles.css';
import { MapContainer, Polyline } from 'react-leaflet';
import { TileLayer } from 'react-leaflet/TileLayer';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { SocketContext } from '../services/socket';

function MapView({ users, me, restosList, arrivalPoint, setArrivalPoint }) {
  const { sio } = useContext(SocketContext);
  const [draggable, setDraggable] = useState(true);

  const perso1Coord = [48.90114974975586, 2.2136828899383545]; //nanterre pref
  const perso2Coord = [48.8953328, 2.2561602]; //courbevoie
  const perso3Coord = [48.8841522, 2.2368863]; //puteaux

  const resto1Coord = [48.89619150760733, 2.2232163600256305]; //resto 1
  const resto2Coord = [48.898683545328545, 2.264794144566431]; //resto 2
  const resto3Coord = [48.89051539771106, 2.2364121181986674]; //resto 3

  const arriveIcon = L.icon({
    iconUrl: require('../assets/markerArrivee.png'),
    iconSize: [50, 60],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94],
  });

  const perso1Icon = L.icon({
    iconUrl: require('../assets/perso1.png'),
    iconSize: [30, 30],

    shadowSize: [68, 95],
    shadowAnchor: [22, 94],
  });
  const perso2Icon = L.icon({
    iconUrl: require('../assets/perso2.png'),
    iconSize: [30, 30],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94],
  });
  const perso3Icon = L.icon({
    iconUrl: require('../assets/perso3.png'),
    iconSize: [30, 30],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94],
  });

  const restoIcon = L.icon({
    iconUrl: require('../assets/resto.png'),
    iconSize: [30, 30],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94],
  });

  //const pointArrivee = [48.893537, 2.226961];
  const markerRef = useRef(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const point = marker.getLatLng();
          sio.sendArrivalPoint([point.lat, point.lng]);
          setArrivalPoint([point.lat, point.lng]);
        }
      },
    }),
    []
  );

  // const toggleDraggable = useCallback(() => {
  //   setDraggable((d) => !d);
  // }, []);

  // const setRestoMarkers = () => {
  //   restosList.forEach((resto) => {
  //     return (
  //       <Marker position={resto.arrivalPoint} icon={restoIcon}>
  //         <Popup>resto.name</Popup>
  //       </Marker>
  //     );
  //   });
  // };

  return (
    <>
      <MapContainer
        center={arrivalPoint}
        zoom={13}
        scrollWheelZoom={false}
        className="leaflet-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {users.map((user, i) => {
          return (
            <div key={i}>
              <Marker position={user.position} icon={perso1Icon}>
                <Popup>{user.name}</Popup>
              </Marker>
              <Polyline
                positions={[
                  user.position,
                  restosList.find((resto) => resto.id === user.restoId)
                    .position,
                ]}
                color="red"
                weight={4}
              />
              <Polyline
                positions={[
                  restosList.find((resto) => resto.id === user.restoId)
                    .position,
                  arrivalPoint,
                ]}
                color="red"
                weight={4}
              />
            </div>
          );
        })}

        {me && (
          <>
            <Marker position={me.position} icon={perso1Icon}>
              <Popup>{me.name}</Popup>
            </Marker>
            <Polyline
              positions={[
                me.position,
                restosList.find((resto) => resto.id === me.restoId).position,
              ]}
              color="red"
              weight={4}
            />
            <Polyline
              positions={[
                restosList.find((resto) => resto.id === me.restoId).position,
                arrivalPoint,
              ]}
              color="red"
              weight={4}
            />
          </>
        )}

        {/* <Marker position={perso2Coord} icon={perso2Icon}>
          <Popup>Perso2</Popup>
        </Marker>
        <Marker position={perso3Coord} icon={perso3Icon}>
          <Popup>Perso3</Popup>
        </Marker> */}

        {restosList.map((resto, i) => {
          return (
            <Marker key={i} position={resto.position} icon={restoIcon}>
              <Popup>{resto.name}</Popup>
            </Marker>
          );
        })}
        <Marker
          draggable={draggable}
          eventHandlers={eventHandlers}
          position={arrivalPoint}
          ref={markerRef}
          icon={arriveIcon}
        ></Marker>
      </MapContainer>
    </>
  );
}

export default MapView;
