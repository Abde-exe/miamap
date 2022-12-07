/**
 *
 * @param {int} d Distance en km
 * @param {int} v Vitesse en km/h
 * @returns {int} Temps en heure (2 chiffre après la virgule)
 */
const calculateTime = (d, v) => {
  return Number((d / v).toFixed(2));
};

export default calculateTime;
