import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Text } from '../../../../../UI/Text';
import s from './Likes.module.css';
import classNames from 'classnames';

export const Likes = ({ className, likes, isLiked, size = '3x', onClick }) => {
  const token = useSelector(state => state.token.token);
  const classes = classNames(
    s.likeWrap,
    className,
    onClick ? s.clickable : s.notclickable
  );
  return (
    <div className={classes} onClick={onClick}>
      {token ?
      (isLiked ?
        <FontAwesomeIcon color='tomato' size={size} icon={faHeartSolid}/> :
        <FontAwesomeIcon color='gray' size={size} icon={faHeartSolid}/>
      ) :
        <FontAwesomeIcon color='tomato' size={size} icon={faHeartRegular} />
      }
      <Text className={s.count}>
        <span>{likes}</span>
      </Text>
    </div>
  );
};

Likes.propTypes = {
  likes: PropTypes.number,
  isLiked: PropTypes.bool,
  className: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func,
};
