/**
 *
 * @param {Int} val / Temps initial en heure
 * @param {Int} time  / Temps à soustraire en heure
 * @return {string} / Temps formaté
 */

const soustractTime = (val, time) => {
  let h = Number(time.toFixed(0));
  let min = Number(((time % 1) * 60).toFixed(0));

  return min > 0 ? val - h - 1 + " h " + (60 - min) : val - h + " h ";
};

export default soustractTime;
