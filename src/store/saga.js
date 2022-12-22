import { all, fork } from 'redux-saga/effects';
import { watchAuth } from './auth/authSaga';
import { watchItem } from './itemDetails/itemDetailsSaga';
import { watchItems } from './items/itemsSaga';
import { watchToken } from './token/tokenSaga';

export default function* rootSaga() {
  yield all([
    fork(watchToken),
    fork(watchAuth),
    fork(watchItems),
    fork(watchItem)
  ]);
}
