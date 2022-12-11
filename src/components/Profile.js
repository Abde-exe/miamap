import timeFormat from "../utils/timeFormat";

function Profile({ user, me = false }) {
  return (
    <div>
      <img width={50} src={require(`../assets/perso${me ? "1" : "2"}.png`)} />
      <h2>{user?.name}</h2>
      <p>
        Distance : <strong> {user.distance} km</strong>
      </p>
      <p>
        Resto choisi : <strong> {user.restoName}</strong>
      </p>
      <p>
        Il reste : <strong> {timeFormat(user.time)} min</strong>
      </p>
    </div>
  );
}

export default Profile;
