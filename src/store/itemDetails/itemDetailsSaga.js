import axios from 'axios';
import { put, select, takeLeading } from 'redux-saga/effects';
import { API_URL } from '../../api-unsplash/const';
import { itemDetailsFail, itemDetailsLoading,
  itemDetailsPending, itemDetailsSuccess } from './itemDetailsSlice';

function* itemFetch(action) {
  const [state, token] = yield select(
    state => [state.items, state.token.token]
  );
  if (state.loading) return;
  yield put(itemDetailsLoading({}));
  try {
    const response = yield axios(
      `${API_URL}/photos/${action.payload}/`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    yield put(itemDetailsSuccess(response.data));
  } catch (err) {
    yield put(itemDetailsFail(err));
  }
}

export function* watchItem() {
  yield takeLeading(itemDetailsPending.type, itemFetch);
}
