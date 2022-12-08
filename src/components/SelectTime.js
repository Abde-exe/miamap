import React, { useContext, useEffect, useState } from "react";
import { TimePicker } from "antd";
import dayjs from "dayjs";
import { Typography } from "antd";
import timeFormat from "../utils/timeFormat";
import { SocketContext } from "../services/socket";
const { Title } = Typography;
const format = "HH:mm";

function SelectTime({ me }) {
  const { sio, socket } = useContext(SocketContext);
  const [timeInHours, setTimeInHours] = useState(13);

  const calculateTimeInHours = (time) => {
    let hours = Number((time.$H + time.$m / 60).toFixed(2));
    sio.sendArrivalTime(hours);
    setTimeInHours(hours);
  };

  const setTime = ({ value }) => {
    console.log(value);
    setTimeInHours(value);
  };

  useEffect(() => {
    socket.on("get_arrivalTime", setTime);

    return () => {
      socket.off("get_arrivalTime", setTime);
    };
  }, []);

  return (
    <div className="timepicker" style={{ padding: 10 }}>
      <Title level={3} style={{ margin: 0 }}>
        {me?.time ? "Pour arriver à" : "Choisir l'heure d'arrivé"}
      </Title>
      <TimePicker
        value={dayjs(timeFormat(timeInHours), format)}
        format={format}
        onSelect={(time) => calculateTimeInHours(time)}
      />
      <Title style={{ margin: 0 }} level={3} className="title">
        {me?.time
          ? `tu dois partir à ${timeFormat(timeInHours - me.time)}`
          : "et un restaurant"}
      </Title>
    </div>
  );
}

export default SelectTime;
