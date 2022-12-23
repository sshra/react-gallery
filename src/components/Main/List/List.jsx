import { Masonry } from '@mui/lab';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useRef } from 'react';
// import s from './List.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { itemsPending,
  itemsSetUserName,
  LIKED_LIST_MODE, PUBLIC_LIST_MODE, SEARCH_LIST_MODE }
  from '../../../store/items/itemsSlice';
import CentredText from '../../../UI/CentredText';
import { Preloader } from '../../../UI/Preloader/Preloader';
import { Toast } from '../../../UI/Toast/Toast';
import ItemPreview from './ItemPreview';

export const List = ({ pageSize = 30, mode = PUBLIC_LIST_MODE }) => {
  console.log('List');
  const { loading, data, error, isLast } = useSelector(state => state.items);
  const token = useSelector(state => state.token.token);
  const endOfList = useRef(null);
  const dispatch = useDispatch();
  const [userName, query] = useSelector(
    state => [state.auth.data.username, state.items.query]);

  useEffect(() => {
    if (mode === LIKED_LIST_MODE) {
      dispatch(itemsSetUserName(userName));
    }
    dispatch(itemsPending({ pageSize, mode }));
  }, [pageSize, token, mode, userName, query]);

  useEffect(() => {
    const observerCallback = (entries) => {
      if (entries.length && entries[0].isIntersecting && !loading && !error) {
        dispatch(itemsPending({}));
      }
    };
    const observerOptions = {
      rootMargin: '100px',
    };
    const observer = new IntersectionObserver(
      observerCallback, observerOptions);

    if (endOfList.current) {
      observer.observe(endOfList.current);
    }

    return () => {
      if (endOfList.current) {
        observer.unobserve(endOfList.current);
      }
    };
  });

  return (
    <Fragment>
      <Masonry
        defaultHeight={250}
        defaultColumns={4}
        columns={{ lg: 6, md: 4, sm: 2, xs: 1 }} spacing={2}>
        {data.map((item) =>
          <ItemPreview key={item.id} data={item} />)
        }
      </Masonry>
      {!isLast && <div ref={endOfList}></div>}
      {loading && <Preloader blockHeight={100}/>}
      {error && <Toast>{error.message}</Toast>}
      {!loading && !data.length &&
        <CentredText height={250}>Sorry, no items here!</CentredText>}
      <Outlet />
    </Fragment>
  );
};

List.propTypes = {
  pageSize: PropTypes.number,
  mode: PropTypes.oneOf([PUBLIC_LIST_MODE, SEARCH_LIST_MODE, LIKED_LIST_MODE]),
};
