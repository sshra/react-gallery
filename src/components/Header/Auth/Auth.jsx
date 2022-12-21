// import PropTypes from 'prop-types';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import s from './Auth.module.css';

export const Auth = () => {
  console.log('Auth');
  return (
    <div className={s.auth}>
      <FontAwesomeIcon size="3x" icon={faUserTie}/>
    </div>
  );
};

export default Auth;

Auth.propTypes = {

};
