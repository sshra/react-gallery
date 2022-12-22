import PropTypes from 'prop-types';
import { Text } from '../../../../../UI/Text';
import s from './Author.module.css';

export const Author = ({ user }) => {
  console.log();

  return (
    <Text
      className={s.author}
      As='a'
      href={user.links.html}
      alt={user.name}
      target="_blank">
      <Text className={s.name}>{user.name}</Text>
      <img className={s.img}
        src={user.profile_image.small}
        title={user.username} />
    </Text>
  );
};

Author.propTypes = {
  user: PropTypes.object.isRequired,
};
