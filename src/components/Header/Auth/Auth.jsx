// import PropTypes from 'prop-types';
import { faRightToBracket, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import s from './Auth.module.css';
import { urlAuth } from '../../../api-unsplash/auth';
import { useAuth } from '../../../hooks/useAuth';
import { Text } from '../../../UI/Text';

export const Auth = () => {
  const urlAuthString = urlAuth.toString();
  const [authData, clearAuth] = useAuth();
  console.log(authData);

  const handleLogout = (e) => {
    e.preventDedault();
    clearAuth();
  };

  console.log(authData);

  return (
    <div className={s.auth}>
      {authData.data.name ?
      <a className={s.authLink} href="#" onClick={handleLogout}>
        <img
          className={s.avatar}
          alt={authData.data.name}
          src={authData.data.image} />
        <Text>{authData.data.username}</Text>
      </a> : (
        authData.loading ?
        <a className={s.authLink} href={urlAuthString}>
          <FontAwesomeIcon size="3x" icon={faSpinner} spin />
        </a> :
        <a className={s.authLink} href={urlAuthString}>
          <FontAwesomeIcon size="3x" icon={faRightToBracket}/>
        </a>
      )}
    </div>
  );
};

export default Auth;

Auth.propTypes = {

};
