import timeFormat from '../utils/timeFormat';
import PersoSvg from './PersoSvg';

function Profile({ user, size }) {
  console.log('user', user);
  return (
    <div>
      <PersoSvg />
      <h2>{user?.name}</h2>
      <p>
        <strong> Distance : {user.distance} km</strong>
      </p>
      <p>
        <strong>Reste : {timeFormat(13 - user.time)}</strong>
      </p>
    </div>
  );
}

export default Profile;
