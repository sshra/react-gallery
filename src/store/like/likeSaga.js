import axios from 'axios';
import { put, select, takeLeading } from 'redux-saga/effects';
import { API_URL } from '../../api-unsplash/const';
import { itemDetailsLike } from '../itemDetails/itemDetailsSlice';
import { itemsLike } from '../items/itemsSlice';
import { likeFail, likeInUse, likePending, likeSuccess } from './likeSlice';

function* likeFetch(action) {
  const [isInUse, token] = yield select(
    state => [state.isAPIinUse, state.token.token]
  );
  if (isInUse || !token) return;
  yield put(likeInUse());

  try {
    const options = {
      headers: { Authorization: `Bearer ${token}` },
      method: action.payload.do === 'like' ? 'post' : 'delete',
    };

    const response =
      yield axios(`${API_URL}/photos/${action.payload.id}/like`, options);

    yield put(itemDetailsLike(response.data));
    yield put(itemsLike(response.data));
    yield put(likeSuccess(response.data));
  } catch (err) {
    yield put(likeFail(err));
  }
}

export function* watchLike() {
  yield takeLeading(likePending.type, likeFetch);
}
