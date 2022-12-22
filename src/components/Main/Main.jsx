// import PropTypes from 'prop-types';
// import style from './Main.module.css';

import { Navigate, Route, Routes } from 'react-router-dom';
import { Text } from '../../UI/Text';
import Layout from '../Layout';
import List from './List';
import Page404 from './Page404';

export const Main = () => {
  console.log('Main');
  return (
    <Layout>
      <Text>Some text</Text>
      <Routes>
        <Route path='/' element={<List />} />
        <Route path='/auth' element={<Navigate to='/'/>} />
        <Route path="/404" element={<Page404/>}/>
        <Route path="*" element={<Navigate to='/404'/>}/>
      </Routes>
    </Layout>
  );
};

Main.propTypes = {

};
