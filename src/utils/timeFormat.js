const timeFormat = (time) => {
  var hours = Math.floor(time);
  var minutes = Math.round((time - hours) * 60);
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return hours + " h " + minutes;
};

export default timeFormat;
