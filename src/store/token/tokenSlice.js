import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: '',
  loading: false,
  data: {},
  error: '',
};

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    tokenCodeExchange: (state) => {
      state.error = '';
    },
    tokenPending: (state) => {
      state.loading = true;
    },
    tokenSuccess: (state, action) => {
      state.loading = false;
      state.token = action.payload.access_token;
      state.data = action.payload;
      state.error = '';
    },
    tokenFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    tokenUpdate: (state, action) => {
      state.token = action.payload;
    },
    tokenDelete: (state) => {
      state.token = '';
    }
  }
});

const { actions, reducer } = tokenSlice;
export const {
  tokenCodeExchange,
  tokenPending,
  tokenSuccess,
  tokenFail,
  tokenUpdate,
  tokenDelete
} = actions;
export default reducer;
