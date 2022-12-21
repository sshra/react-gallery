// import PropTypes from 'prop-types';
// import style from './Logo.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPanorama } from '@fortawesome/free-solid-svg-icons';

export const Logo = () => {
  console.log('Logo');
  return (
    <FontAwesomeIcon color="red" size='3x' icon={faPanorama} />
  );
};

Logo.propTypes = {

};

export default Logo;
