import { useDispatch } from 'react-redux';
import { tokenCodeExchange } from '../store/token/tokenSlice';
import { ACCESS_KEY, API_URL_TOKEN, GRANT_TYPE, REDIRECT_URI, SECRET_KEY }
  from './const';

export const setToken = (token) => {
  localStorage.setItem('bearer', token);
};

export const getToken = () => {
  let token = '';
  const dispatch = useDispatch();
  if (location.pathname.includes('/auth')) {
    const code = new URLSearchParams(location.search).get('code');
    dispatch(tokenCodeExchange(code));
  } else {
    token = localStorage.getItem('bearer', '');
  }

  return token;
};

// request token URL
export const urlTokenRequest = new URL(API_URL_TOKEN);
urlTokenRequest.searchParams.append('client_id', ACCESS_KEY);
urlTokenRequest.searchParams.append('client_secret', SECRET_KEY);
urlTokenRequest.searchParams.append('redirect_uri', REDIRECT_URI);
urlTokenRequest.searchParams.append('grant_type', GRANT_TYPE);
