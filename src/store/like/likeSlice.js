import { createSlice } from '@reduxjs/toolkit';
import { extractErrorMessage } from '../../api-unsplash/extractErrorMessage';

const initialState = {
  isAPIinUse: false,
  error: '',
};

const likeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {
    likePending: (state) => {
      state.error = '';
    },
    likeInUse: (state) => {
      state.isAPIinUse = true;
    },
    likeSuccess: (state, action) => {
      state.isAPIinUse = false;
      state.error = '';
    },
    likeFail: (state, action) => {
      state.isAPIinUse = false;
      console.log(action);
      state.error = extractErrorMessage(action.payload);
    },
  }
});

const { actions, reducer } = likeSlice;
export const { likePending, likeInUse, likeSuccess, likeFail } = actions;

export default reducer;
