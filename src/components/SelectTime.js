import React, { useState } from 'react';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
const format = 'HH:mm';

function SelectTime() {
  const [timeInHours, setTimeInHours] = useState();

  const calculateTimeInHours = (time) => {
    setTimeInHours((time.$H + time.$m / 60).toFixed(2));
  };

  return (
    <TimePicker
      defaultValue={dayjs('12:12', format)}
      format={format}
      onSelect={(time) => calculateTimeInHours(time)}
    />
  );
}

export default SelectTime;
