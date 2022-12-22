import PropTypes from 'prop-types';
import s from './ItemPreview.module.css';
import Thumbnail from './Thumbnail';
import Author from './Author';
import Likes from './Likes';
import Date from './Date';
import Summary from './Summary';

export const ItemPreview = ({ data }) =>
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
        <Likes className={s.likes}
          likes={data.likes}
          liked={data.liked_by_user} />
      </div>
    </div>
    <div className={s.dateWrap}>
      <Date dateTime={data.updated_at} />
    </div>
    <Summary text={data.alt_description}></Summary>
  </div>;

ItemPreview.propTypes = {
  data: PropTypes.object
};
