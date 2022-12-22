// import PropTypes from 'prop-types';
// import style from './Main.module.css';

import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from '../Layout';
import List from './List';
import Page404 from './Page404';
import ItemView from './ItemView';
import { Modal } from '../../UI/Modal/Modal';

export const Main = () => {
  console.log('Main');
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<List />}>
          <Route path='/item/:id' element={<Modal><ItemView /></Modal>} />
        </Route>
        <Route path='/auth' element={<Navigate to='/'/>} />
        <Route path="/404" element={<Page404/>}/>
        <Route path="*" element={<Navigate to='/404'/>}/>
      </Routes>
    </Layout>
  );
};

Main.propTypes = {

};
