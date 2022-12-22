// import PropTypes from 'prop-types';
import s from './Header.module.css';
import Logo from './Logo';
import PageTitle from './PageTitle';
import Auth from './Auth';

export const Header = () => {
  console.log('Header');
  return (
    <div className={s.header}>
      <div className={s.gridContainer}>
        <Logo />
        <PageTitle />
        <Auth />
      </div>
    </div>
  );
};

Header.propTypes = {

};
