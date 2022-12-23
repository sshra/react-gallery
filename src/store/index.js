import createSagaMiddleware from '@redux-saga/core';
import { configureStore } from '@reduxjs/toolkit';
import rootSaga from './saga';
import authReducer from './auth/authSlice';
import tokenReducer from './token/tokenSlice';
import itemReducer from './items/itemsSlice';
import likeReducer from './like/likeSlice';

import itemDetailsReducer from './itemDetails/itemDetailsSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    token: tokenReducer,
    items: itemReducer,
    item: itemDetailsReducer,
    like: likeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);
export default store;
