import PropTypes from 'prop-types';
import s from './ItemPreview.module.css';
import Thumbnail from './Thumbnail';
import Author from './Author';
import Likes from './Likes';
import Date from './Date';
import Summary from './Summary';
import { useDispatch } from 'react-redux';
import { likePending } from '../../../../store/like/likeSlice';
import React from 'react';

export const ItemPreview = ({ data }) => {
  const dispatch = useDispatch();
  const handleLike = () => {
    dispatch(likePending({
      id: data.id,
      do: data.liked_by_user ? 'unlike' : 'like' }));
  };

  return (
    <div className={s.item}>
      <div className={s.wrap}>
        <Thumbnail
          id={data.id}
          url={data.urls.small_s3 ? data.urls.small_s3 : data.urls.small }
          alt={data.alt_description}
          title={data.description}
          width={data.width}
          height={data.height}
        />
        <div className='top-right'>
          <Author user={data.user} />
        </div>
        <div className='bottom-left'>
          <Likes className={s.likes} onClick={handleLike}
            likes={data.likes}
            isLiked={data.liked_by_user} />
        </div>
      </div>
      <div className={s.dateWrap}>
        <Date dateTime={data.updated_at} />
      </div>
      <Summary text={data.alt_description}></Summary>
    </div>
  );
};

ItemPreview.propTypes = {
  data: PropTypes.object
};

