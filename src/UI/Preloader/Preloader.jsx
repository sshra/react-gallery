import PropTypes from 'prop-types';
import s from './Preloader.module.css';

import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Preloader = ({ size = '3x', blockHeight, color }) =>
  <div className={s.preloader} style={{ [`height`]: blockHeight }}>
    <FontAwesomeIcon size={size} icon={faSpinner} color={color} spin />
  </div>;

Preloader.propTypes = {
  size: PropTypes.string,
  blockHeight: PropTypes.number,
  color: PropTypes.string,
};
