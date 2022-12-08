/**

Cette fonction prend une distance en km et une vitesse en km/h, et renvoie
le temps qu'il faudrait pour parcourir cette distance en heures, avec un arrondi à deux chiffres après la virgule.
@param {Number} d - Distance en km
@param {Number} v - Vitesse en km/h
@returns {Number} - Temps en heures, avec un arrondi à deux chiffres après la virgule
*/
const calculateTime = (d, v) => {
  return Number((d / v).toFixed(2));
};
export default calculateTime;
