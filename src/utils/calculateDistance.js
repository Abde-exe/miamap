/**
Cette fonction prend deux coordonnées de latitude et de longitude en degrés décimaux, et renvoie
la distance en kilomètres entre les deux points en utilisant la formule de la distance moyenne de la Terre.
@param {Number} lat1 - Latitude en degrés décimaux du premier point
@param {Number} lon1 - Longitude en degrés décimaux du premier point
@param {Number} lat2 - Latitude en degrés décimaux du deuxième point
@param {Number} lon2 - Longitude en degrés décimaux du deuxième point
@returns {Number} - Distance en kilomètres, avec un arrondi à deux chiffres après la virgule
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
  return Number(d.toFixed(2));
};

export default calculateDistance;
