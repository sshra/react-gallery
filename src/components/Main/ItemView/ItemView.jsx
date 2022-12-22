import s from './ItemView.module.css';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { itemDetailsPending }
  from '../../../store/itemDetails/itemDetailsSlice';
import { Preloader } from '../../../UI/Preloader/Preloader';
import Author from '../List/ItemPreview/Author';
import Likes from '../List/ItemPreview/Likes';
import { Date } from '../List/ItemPreview/Date/Date';
import { Button, Card, CardActions, CardContent, Chip, Typography }
  from '@mui/material';

export const ItemView = () => {
  const { id } = useParams();
  const [isShownMore, setisShownMore] = useState(false);
  const [isWide, setIsWide] = useState(false);
  const [loading, item, token] = useSelector(state =>
    [state.item.loading, state.item.data, state.token.token]);
  const dispatch = useDispatch();
  console.log(item);
  useEffect(() => {
    dispatch(itemDetailsPending(id));
  }, [id]);

  return (
    <div className={s.itemView}>
      {loading ?
      <Preloader /> :
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
              <Button variant="contained">
                <Likes className={s.likes} size='2x'
                  likes={item.likes}
                  liked={item.liked_by_user} />
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
            <Button variant="contained">
              Back to List
            </Button>
          </div>
        </div>
      </div>
      }
    </div>
  );
};
