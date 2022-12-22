import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  data: [],
  error: '',
};

const itemDetailsSlice = createSlice({
  name: 'itemDetails',
  initialState,
  reducers: {
    itemDetailsPending: (state, action) => {
      console.log(action.payload);
      state.error = '';
    },
    itemDetailsLoading: (state) => {
      state.loading = true;
    },
    itemDetailsSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    },
    itemDetailsFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  }
});

const { actions, reducer } = itemDetailsSlice;
export const { itemDetailsPending,
  itemDetailsLoading, itemDetailsSuccess, itemDetailsFail } = actions;

export default reducer;
