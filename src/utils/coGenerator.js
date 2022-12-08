function coGenerator(lat, lng, radius) {
  // on calcule la différence maximale en latitude et en longitude en fonction du rayon en km
  const latDelta = radius / 111.2;
  const lngDelta = radius / (111.2 * Math.cos(lat));

  // on génère des coordonnées aléatoires jusqu'à ce qu'une coordonnée valide soit trouvée
  let newLat, newLng;
  do {
    newLat = lat + (Math.random() * 2 - 1) * latDelta;
    newLng = lng + (Math.random() * 2 - 1) * lngDelta;
  } while (
    Math.abs(newLat - lat) > latDelta ||
    Math.abs(newLng - lng) > lngDelta
  );

  return [newLat, newLng];
}

export default coGenerator;
