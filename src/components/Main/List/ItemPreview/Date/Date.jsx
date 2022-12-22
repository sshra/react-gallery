import PropTypes from 'prop-types';
import { formatDate, formatTimestamp } from '../../../../../utils/formatDate';
import s from './Date.module.css';

export const Date = ({ timestamp, dateTime }) =>
  (timestamp ?
    <time className={s.date} dateTime={timestamp}>
      {formatTimestamp(timestamp)}
    </time> :
    <time className={s.date} dateTime={dateTime}>
      {formatDate(dateTime)}
    </time>);

Date.propTypes = {
  dateTime: PropTypes.string,
  timestamp: PropTypes.number,
};
