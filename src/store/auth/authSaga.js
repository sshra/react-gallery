import axios from 'axios';
import { put, select, takeLatest } from 'redux-saga/effects';
import { API_URL }
  from '../../api-unsplash/const';
import { tokenDelete } from '../token/tokenSlice';
import { authFail, authPending, authSuccess }
  from './authSlice';

export function* fetchAuth() {
  const token = yield select(state => state.token.token);
  if (!token) return;

  try {
    const response = yield axios(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log(response.data);
    const data = {
      name: response.data.name,
      username: response.data.username,
      image: response.data.profile_image.medium.replace(/\?.*$/, ''),
    };
    yield put(authSuccess(data));
  } catch (err) {
    yield put(authFail(err.toString()));
    yield put(tokenDelete());
  }
}

export function* watchAuth() {
  yield takeLatest(authPending.type, fetchAuth);
}
