import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Text } from '../../../../../UI/Text';
import s from './Likes.module.css';
import classNames from 'classnames';

export const Likes = ({ className, likes, isLiked, size = '3x' }) => {
  const token = useSelector(state => state.token.token);
  const [elemLikes, setElemLikes] = useState(likes);
  const [elemIsLiked, setElemIsLiked] = useState(isLiked);

  const handleClick = () => {
    console.log('click2');
    if (token) {
      console.log('click');
      setElemLikes(elemLikes + (elemIsLiked ? -1 : 1));
      setElemIsLiked(!elemIsLiked);
    }
  };

  return (
    <div className={classNames(s.likeWrap, className)} onClick={handleClick}>
      {token ?
      (elemIsLiked ?
        <FontAwesomeIcon color='tomato' size={size} icon={faHeartSolid}/> :
        <FontAwesomeIcon color='gray' size={size} icon={faHeartSolid}/>
      ) :
        <FontAwesomeIcon color='black' size={size} icon={faHeartRegular} />
      }
      <Text className={s.count}>
        <span>{elemLikes}</span>
      </Text>
    </div>
  );
};

Likes.propTypes = {
  likes: PropTypes.number,
  isLiked: PropTypes.bool,
  className: PropTypes.string,
  size: PropTypes.string,
};
