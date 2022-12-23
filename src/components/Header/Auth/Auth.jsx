// import PropTypes from 'prop-types';
import { faRightToBracket }
  from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import s from './Auth.module.css';
import { urlAuth } from '../../../api-unsplash/auth';
import { useAuth } from '../../../hooks/useAuth';
import { Text } from '../../../UI/Text';
import { Preloader } from '../../../UI/Preloader/Preloader';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ProfileMenu } from '../../ProfileMenu/ProfileMenu';

export const Auth = () => {
  const urlAuthString = urlAuth.toString();
  const [authData] = useAuth();
  const [open, setOpen] = useState(false);
  const token = useSelector(state => state.token.token);
  console.log(authData);

  const closeFunc = () => {
    setOpen(false);
  };

  return (
    <div className={s.auth}>
      {token && authData.data.name ?
      <a className={s.authLink} href="#" onClick={() => setOpen(true)}>
        <img
          className={s.avatar}
          alt={authData.data.name}
          src={authData.data.image} />
        <Text>{authData.data.username}</Text>
      </a> : (
        authData.loading ?
        <a className={s.authLink} href={urlAuthString}>
          <Preloader/>
        </a> :
        <a className={s.authLink} href={urlAuthString}>
          <FontAwesomeIcon size="3x" icon={faRightToBracket}/>
        </a>
      )}
      { open && <ProfileMenu closeFunc={closeFunc} /> }
    </div>
  );
};

export default Auth;
