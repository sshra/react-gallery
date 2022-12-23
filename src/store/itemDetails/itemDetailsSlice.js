import { createSlice } from '@reduxjs/toolkit';
import { extractErrorMessage } from '../../api-unsplash/extractErrorMessage';

const initialState = {
  loading: false,
  data: null,
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
      state.data = null;
    },
    itemDetailsSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    },
    itemDetailsFail: (state, action) => {
      state.data = null;
      state.loading = false;
      console.log(action);
      state.error = extractErrorMessage(action.payload);
    },
    itemDetailsLike: (state, action) => {
      if (state.data && action.payload.photo.id === state.data.id) {
        console.log('itemDetailsLike');
        state.data = { ...state.data, ...action.payload.photo };
      }
    },
  }
});

const { actions, reducer } = itemDetailsSlice;
export const { itemDetailsPending, itemDetailsLike,
  itemDetailsLoading, itemDetailsSuccess, itemDetailsFail } = actions;

export default reducer;
