import PropTypes from 'prop-types';
import s from './Layout.module.css';

export const Layout = ({ children }) =>
  <div className={s.container}>
    <div className={s.masonryFix}>
      {children}
    </div>
  </div>;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
