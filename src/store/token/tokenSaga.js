import axios from 'axios';
import { put, select, takeLatest, takeLeading } from 'redux-saga/effects';
import { ACCESS_KEY, API_URL_TOKEN, GRANT_TYPE,
  REDIRECT_URI, SECRET_KEY }
  from '../../api-unsplash/const';
import { setToken }
  from '../../api-unsplash/token';
import { tokenCodeExchange, tokenDelete, tokenFail,
  tokenPending, tokenSuccess, tokenUpdate }
  from './tokenSlice';

export function* fetchToken(action) {
  const loading = yield select(state => state.token.loading);
  console.log(loading);
  if (loading) return;
  yield put(tokenPending());

  try {
    const response = yield axios({
      method: 'post',
      url: API_URL_TOKEN,
      data: {
        grant_type: GRANT_TYPE,
        client_id: ACCESS_KEY,
        client_secret: SECRET_KEY,
        redirect_uri: REDIRECT_URI,
        code: action.payload,
      }
    });
    yield put(tokenSuccess(response.data));
    yield put(tokenUpdate(response.data.access_token));
  } catch (err) {
    yield console.log(err);
    yield put(tokenFail(err.toString()));
    yield put(tokenDelete());
  }
}

export function* manageToken(action) {
  if (action.type === tokenUpdate.type) {
    yield setToken(action.payload);
  }
  if (action.type === tokenDelete.type) {
    yield setToken('');
  }
}

export function* watchToken() {
  yield takeLeading(tokenCodeExchange.type, fetchToken);
  yield takeLatest([tokenDelete.type, tokenUpdate.type], manageToken);
}
