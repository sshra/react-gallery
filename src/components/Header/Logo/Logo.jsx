// import PropTypes from 'prop-types';
// import style from './Logo.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPanorama } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export const Logo = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };

  return (
    <FontAwesomeIcon color="red" size='3x' icon={faPanorama}
      onClick={handleClick} />
  );
};

Logo.propTypes = {

};

export default Logo;
