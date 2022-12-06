import React, { useCallback, useMemo, useRef, useState } from 'react';
import './styles.css';
import { MapContainer } from 'react-leaflet';
import { TileLayer } from 'react-leaflet/TileLayer';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

function MapView() {
  const [draggable, setDraggable] = useState(false);

  const perso1Coord = [48.90114974975586, 2.2136828899383545]; //nanterre pref
  const perso2Coord = [48.8953328, 2.2561602]; //courbevoie
  const perso3Coord = [48.8841522, 2.2368863]; //puteaux

  var arriveIcon = L.icon({
    iconUrl: require('../assets/markerArrivee.png'),
    iconSize: [50, 60],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    //shadowUrl: 'my-icon-shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [22, 94],
  });

  const perso1Icon = L.icon({
    iconUrl: require('../assets/perso1.png'),
    iconSize: [30, 30],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94],
  });
  const perso2Icon = L.icon({
    iconUrl: require('../assets/perso2.png'),
    iconSize: [30, 30],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94],
  });
  const perso3Icon = L.icon({
    iconUrl: require('../assets/perso3.png'),
    iconSize: [30, 30],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94],
  });
  const center = {
    lat: 48.893537,
    lng: 2.226961,
  };
  const [position, setPosition] = useState(center);
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

        <Marker
          draggable={draggable}
          eventHandlers={eventHandlers}
          position={position}
          ref={markerRef}
          icon={arriveIcon}
        >
          <Popup minWidth={90}>
            <span onClick={toggleDraggable}>
              {draggable
                ? 'Déplacer le marqueur'
                : 'Cliquer ici pour déplacer le marqueur'}
            </span>
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
}

export default MapView;
