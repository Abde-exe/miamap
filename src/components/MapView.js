import React, { useCallback, useMemo, useRef, useState } from 'react';
import './styles.css';
import { MapContainer, Polyline } from 'react-leaflet';
import { TileLayer } from 'react-leaflet/TileLayer';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

function MapView() {
  const [draggable, setDraggable] = useState(true);

  const perso1Coord = [48.90114974975586, 2.2136828899383545]; //nanterre pref
  const perso2Coord = [48.8953328, 2.2561602]; //courbevoie
  const perso3Coord = [48.8841522, 2.2368863]; //puteaux
  const arriveeCoord = [48.893537, 2.226961]; //arche
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

  const [position, setPosition] = useState(arriveeCoord);
  //const pointArrivee = [48.893537, 2.226961];
  const markerRef = useRef(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    []
  );

  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);
  return (
    <>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        className="leaflet-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={perso1Coord} icon={perso1Icon}>
          <Popup>Perso1</Popup>
        </Marker>
        <Marker position={perso2Coord} icon={perso2Icon}>
          <Popup>Perso2</Popup>
        </Marker>
        <Marker position={perso3Coord} icon={perso3Icon}>
          <Popup>Perso3</Popup>
        </Marker>

        <Marker position={resto1Coord} icon={restoIcon}>
          <Popup>Resto1</Popup>
        </Marker>
        <Marker position={resto2Coord} icon={restoIcon}>
          <Popup>Resto2</Popup>
        </Marker>
        <Marker position={resto3Coord} icon={restoIcon}>
          <Popup>Resto3</Popup>
        </Marker>

        <Marker
          draggable={draggable}
          eventHandlers={eventHandlers}
          position={position}
          ref={markerRef}
          icon={arriveIcon}
        >
          {/* <Popup minWidth={90}>
            <span onClick={toggleDraggable}>
              {draggable
                ? "Déplacer le pt d'arrivée"
                : "Cliquer ici pour déplacer le pt d'arrivée"}
            </span>
          </Popup> */}
        </Marker>

        <Polyline
          positions={[perso1Coord, resto1Coord]}
          color="red"
          weight={4}
        />
        <Polyline positions={[resto1Coord, position]} color="red" weight={4} />

        <Polyline
          positions={[perso2Coord, resto2Coord]}
          color="blue"
          weight={4}
        />
        <Polyline positions={[resto2Coord, position]} color="blue" weight={4} />

        <Polyline
          positions={[perso3Coord, resto3Coord]}
          color="yellow"
          weight={4}
        />
        <Polyline
          positions={[resto3Coord, position]}
          color="yellow"
          weight={4}
        />
      </MapContainer>
    </>
  );
}

export default MapView;
