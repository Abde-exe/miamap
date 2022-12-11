/**
Cette fonction prend un nombre représentant le nombre d'heures en décimal et renvoie une chaîne de caractères formatée
sous la forme "X h Y", où X est le nombre d'heures entières et Y est le nombre de minutes arrondi.
@param {number} time - Le temps en heures en décimal
@returns {string} - Le temps formaté sous la forme "H h MM"
*/
const timeFormat = (time) => {
  let hours = Math.floor(time);
  let minutes = Math.round((time - hours) * 60);
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return hours + " h " + minutes;
};
export default timeFormat;
