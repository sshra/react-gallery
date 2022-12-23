import s from './ItemView.module.css';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { itemDetailsPending }
  from '../../../store/itemDetails/itemDetailsSlice';
import Preloader from '../../../UI/Preloader';
import Toast from '../../../UI/Toast';
import Author from '../List/ItemPreview/Author';
import Likes from '../List/ItemPreview/Likes';
import { Date } from '../List/ItemPreview/Date/Date';
import { Button, Card, CardActions, CardContent, Chip, Typography }
  from '@mui/material';
import useCloseModal from '../../../hooks/useCloseModal';
import { likePending } from '../../../store/like/likeSlice';

export const ItemView = () => {
  const { id } = useParams();
  const closeModal = useCloseModal();
  const [isShownMore, setisShownMore] = useState(false);
  const [isWide, setIsWide] = useState(true);
  const [loading, error, item, token] = useSelector(state =>
    [state.item.loading,
      state.item.error,
      state.item.data,
      state.token.token
    ]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(itemDetailsPending(id));
  }, [id]);

  const handleLike = () => {
    dispatch(likePending({ id, do: item.liked_by_user ? 'unlike' : 'like' }));
  };

  console.log(item);

  return (
    <div className={s.itemView}>
      {error && <Toast>{error.message}</Toast> }
      {loading && <Preloader />}
      {item &&
      <div className={s.canvas}
        style={{
          backgroundImage: `url(${item.urls.regular})`,
          backgroundSize: isWide ? 'cover' : 'contain',
        }}
      >
        <div className='top-right'>
          <Author user={item.user} />
          {isShownMore &&
            <Card className={s.card} variant="outlined">
              <CardContent>
                <Typography variant="body2" gutterBottom>
                  {item.alt_description}
                </Typography>
                <Typography gutterBottom>
                  <strong>Last update: </strong>
                  <Date dateTime={item.updated_at} />
                </Typography>
              </CardContent>
              {item.tags.length &&
                <CardActions>
                  <div className={s.stack}>
                    {item.tags.map((item, index) =>
                      <Chip key={index} label={item.title} variant="outlined" />
                    )}
                  </div>
                </CardActions>
              }
            </Card>
          }
        </div>
        <div className='bottom-left'>
        </div>
        <div className='bottom-right'>
          <div className={s.stack}>
            {token &&
              <Button variant="contained" onClick={handleLike}>
                <Likes className={s.likes} size='2x'
                  likes={item.likes}
                  isLiked={item.liked_by_user} />
                &nbsp;&nbsp;
                {item.liked_by_user ? 'Unlike' : 'Like It'}
              </Button>
            }
            <Button
              variant="contained"
              onClick={() => setisShownMore(!isShownMore)}>
              {isShownMore ? 'Hide Details' : 'Show Info'}
            </Button>
            <Button
              variant="contained"
              onClick={() => setIsWide(!isWide)}>
              {isWide ? 'Contain' : 'Cover'}
            </Button>
            <Button variant="contained" onClick={closeModal}>
              Back to List
            </Button>
          </div>
        </div>
      </div>
      }
    </div>
  );
};
