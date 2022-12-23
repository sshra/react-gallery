import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authPending } from '../store/auth/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const [authState, token] = useSelector(
    state => [state.auth, state.token.token]
  );

  useEffect(() => {
    if (token && !authState.data.username) {
      dispatch(authPending());
    }
  }, [token]);

  return [authState];
};
