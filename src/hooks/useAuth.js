import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout, authPending } from '../store/auth/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const [authState, token] = useSelector(
    state => [state.auth, state.token.token]
  );

  useEffect(() => {
    if (token) {
      dispatch(authPending());
    }
  }, [token]);

  const clearAuth = () => dispatch(authLogout());
  return [authState, clearAuth];
};
