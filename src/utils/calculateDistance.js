/**
 * @param {Int} lat1 Lattitude point 1
 * @param {Int} lon1 Longitude point 1
 * @param {Int} lat2 Lattitude point 2
 * @param {Int} lon2 Lattitude point 2
 * @returns Distance en km
 */
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  // Convertir les degrés en radians
  lat1 = (lat1 * Math.PI) / 180;
  lon1 = (lon1 * Math.PI) / 180;
  lat2 = (lat2 * Math.PI) / 180;
  lon2 = (lon2 * Math.PI) / 180;

  // Distance moyenne de la Terre au centre en km
  const R = 6371;

  // Calculer la distance
  const d =
    Math.acos(
      Math.sin(lat1) * Math.sin(lat2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2)
    ) * R;

  // Valeur retourné en km (2 chiffres après la virgule)
  console.log("number", d);
  return Number(d.toFixed(2));
};

export default calculateDistance;
