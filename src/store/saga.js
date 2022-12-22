import { all, fork } from 'redux-saga/effects';
import { watchAuth } from './auth/authSaga';
import { watchToken } from './token/tokenSaga';

export default function* rootSaga() {
  yield all([
    fork(watchToken),
    fork(watchAuth),
  ]);
}
