import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { getToken } from './api-unsplash/token';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import { tokenUpdate } from './store/token/tokenSlice';

function App() {
  const dispatch = useDispatch();
  dispatch(tokenUpdate(getToken()));

  return (
    <Routes>
      <Route path='*' element={ <><Header /><Main/></> } />
    </Routes>
  );
}

export default App;
