import axios from 'axios';
import { put, select, takeLeading } from 'redux-saga/effects';
import { API_URL } from '../../api-unsplash/const';
import { itemsFail, itemsLoading, itemsPending, itemsSuccess }
  from './itemsSlice';

function* itemsFetch(action) {
  const [state, token] = yield select(
    state => [state.items, state.token.token]
  );
  if (state.loading || state.nextPage > 2 || state.error) return;
  yield put(itemsLoading({}));
  try {
    const response = yield axios(
      `${API_URL}/photos?page=${state.nextPage}&per_page=${state.pageSize}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    yield put(itemsSuccess(response.data));
  } catch (err) {
    yield put(itemsFail(err));
  }
}

export function* watchItems() {
  yield takeLeading(itemsPending.type, itemsFetch);
}
