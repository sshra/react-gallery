// import PropTypes from 'prop-types';
import s from './PageTitle.module.css';

import { Text } from '../../../UI/Text';

export const PageTitle = () => {
  console.log('PageTitle');
  return (
    <Text size={22} tsize={26} className={s.title} As='h1' center>
      The Unsplash React Gallery
    </Text>
  );
};

PageTitle.propTypes = {

};
