import timeFormat from "../utils/timeFormat";
import PersoSvg from "./PersoSvg";

function Profile({ user, me = false }) {
  console.log("user", user);
  return (
    <div>
      <img width={50} src={require(`../assets/perso${me ? "1" : "2"}.png`)} />
      <h2>{user?.name}</h2>
      <p>
        <strong> Distance : {user.distance} km</strong>
      </p>
      <p>
        <strong>Reste : {timeFormat(user.time)}</strong>
      </p>
    </div>
  );
}

export default Profile;
