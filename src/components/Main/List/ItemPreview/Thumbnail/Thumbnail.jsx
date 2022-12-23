import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './Thumbnail.module.css';
import Transparent from './img/transparent.png';
import { Preloader } from '../../../../../UI/Preloader/Preloader';
import { useBuildItemLink } from '../../../../../hooks/useBuildItemLink';

export const Thumbnail = ({ url, alt, title, id, width, height }) => {
  const navigate = useNavigate();
  const [isReady, setIsReady] = useState(false);
  const uri = useBuildItemLink(id);

  const handleLoad = () => {
    setIsReady(true);
    console.log('ready!');
  };

  const handleError = () => {
    console.log('error!');
  };

  const handleClick = (e) => {
    navigate(uri);
  };

  return (
    <div onClick={handleClick}>
      {!isReady &&
        <div className={s.wrap}>
          <img className={s.dummy} alt='image is loading' src={Transparent}
            style={{ aspectRatio: `${width} / ${height}` }} />
          <div className={s.preloadWrap}>
            <Preloader color='lightgray' size="4x"/>
          </div>
        </div>
      }
      <img
        className={s.img}
        style={{
          display: isReady ? 'block' : 'none',
          aspectRatio: `${width} / ${height}` }}
        alt={alt} title={title} src={url}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
};

Thumbnail.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string,
  title: PropTypes.string,
  id: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
};
