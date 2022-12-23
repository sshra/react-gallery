import { createSlice } from '@reduxjs/toolkit';
import { extractErrorMessage } from '../../api-unsplash/extractErrorMessage';
// import { dummyData } from './itemsDummyData';

export const PUBLIC_LIST_MODE = 'public';
export const SEARCH_LIST_MODE = 'search';
export const LIKED_LIST_MODE = 'liked'; // (/users/:username/likes)

const initialState = {
  loading: false,
  data: [],
  error: '',
  // partial load
  pageSize: 10,
  nextPage: 1,
  isLast: false,
  // modes
  mode: PUBLIC_LIST_MODE,
  query: '', // SEARCH_LIST_MODE
  username: '', // LIKED_LIST_MODE
};

// initialState.data = dummyData;
const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    itemsPending: (state, action) => {
      console.log(action);
      if (action.payload) {
        const { pageSize, mode } = action.payload;
        if (mode) {
          // refresh list
          state.nextPage = 1;
          state.isLast = false;
          // state.error = '';
          state.data = [];
          state.pageSize = pageSize;
          state.mode = mode;
        }
      }
    },
    itemsLoading: (state) => {
      state.loading = true;
    },
    itemsSuccess: (state, action) => {
      state.loading = false;
      state.data = [...state.data, ...action.payload];
      state.error = '';
      state.isLast = !action.payload.length;
      state.nextPage += 1;
    },
    itemsFail: (state, action) => {
      state.error = extractErrorMessage(action.payload);
      state.loading = false;
    },
    itemsLike: (state, action) => {
      const index = state.data.findIndex(
        (elem) => elem.id === action.payload.photo.id
      );
      if (index >= 0) {
        state.data[index] = { ...state.data[index], ...action.payload.photo };
      }
    },
    itemsSetUserName: (state, action) => {
      state.username = action.payload;
    },
    itemsSetQuery: (state, action) => {
      state.query = action.payload;
    },
  }
});

const { actions, reducer } = itemsSlice;
export const { itemsPending, itemsLoading, itemsSuccess, itemsSetQuery,
  itemsFail, itemsLike, itemsSetUserName } = actions;

export default reducer;
