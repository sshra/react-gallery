import axios from 'axios';
import { put, select, takeLeading } from 'redux-saga/effects';
import { API_URL, ACCESS_KEY } from '../../api-unsplash/const';
import { itemDetailsFail, itemDetailsLoading,
  itemDetailsPending, itemDetailsSuccess } from './itemDetailsSlice';

function* itemFetch(action) {
  const [item, token] = yield select(
    state => [state.item, state.token.token]
  );
  if (item.loading) return;
  yield put(itemDetailsLoading({}));

  try {
    const options = {
      headers: token ?
      { Authorization: `Bearer ${token}` } :
      { Authorization: `Client-ID ${ACCESS_KEY}` }
    };

    const response = yield axios(
      `${API_URL}/photos/${action.payload}`, options
    );
    yield put(itemDetailsSuccess(response.data));
  } catch (err) {
    yield put(itemDetailsFail(err));
  }
}

export function* watchItem() {
  yield takeLeading(itemDetailsPending.type, itemFetch);
}
