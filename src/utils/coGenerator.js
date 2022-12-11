/**
Cette fonction prend des coordonnées de latitude et de longitude en degrés décimaux et un rayon en km,
et génère des coordonnées aléatoires dans un rayon autour des coordonnées d'origine.
@param {Number} lat - Latitude en degrés décimaux
@param {Number} lng - Longitude en degrés décimaux
@param {Number} radius - Rayon en kilomètres
@returns {Array} - Tableau contenant les coordonnées générées aléatoirement sous la forme [latitude, longitude]
*/
function coGenerator(lat, lng, radius) {
  // Convertir le rayon de km en degrés
  const radiusInDegrees = radius / 111.2;
  // Générer un angle aléatoire
  const angle = Math.random() * 360;

  // Convertir l'angle en radians
  const angleInRadians = (angle * Math.PI) / 180;

  // Calculer les coordonnées de la coordonnée aléatoire
  // en utilisant l'angle et le rayon en degrés
  const newLng = lng + radiusInDegrees * Math.cos(angleInRadians);
  const newLat = lat + radiusInDegrees * Math.sin(angleInRadians);

  // Retourner les coordonnées générées aléatoirement
  return [newLat, newLng];
}

export default coGenerator;
