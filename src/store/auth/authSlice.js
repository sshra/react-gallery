import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  data: {
    name: null,
    usename: null,
    image: null,
  },
  error: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authPending: (state) => {
      state.loading = true;
      state.data = initialState.data;
      state.error = '';
    },
    authSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    },
    authFail: (state, action) => {
      state.loading = false;
      state.data = {};
      state.error = action.payload.error;
    },
    authLogout: (state) => {
      state = { ...initialState };
    },
  }
});

const { actions, reducer } = authSlice;
export const { authPending, authSuccess, authFail,
  authLogout } = actions;
export default reducer;
