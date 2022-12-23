import axios from 'axios';
import { put, select, takeEvery } from 'redux-saga/effects';
import { API_URL, ACCESS_KEY } from '../../api-unsplash/const';
import { itemsFail, itemsLoading, itemsPending, itemsSuccess,
  LIKED_LIST_MODE, PUBLIC_LIST_MODE, SEARCH_LIST_MODE }
  from './itemsSlice';

function* itemsFetch(action) {
  const [state, token, authLoading] = yield select(
    state => [state.items, state.token.token, state.auth.loading]
  );
  console.log(state);
  if (state.loading || authLoading || state.error) return;
  yield put(itemsLoading({}));
  try {
    const options = {
      headers: token ?
        { Authorization: `Bearer ${token}` } :
        { Authorization: `Client-ID ${ACCESS_KEY}` },
      params: {
        page: state.nextPage,
        per_page: state.pageSize
      }
    };
    let response;
    switch (state.mode) {
      case SEARCH_LIST_MODE:
        options.params.query = state.query;
        response = yield axios(`${API_URL}/search/photos`, options);
        yield put(itemsSuccess(response.data.results));
        break;
      case LIKED_LIST_MODE:
        response = yield axios(
          `${API_URL}/users/${state.username}/likes`, options
        );
        yield put(itemsSuccess(response.data));
        break;
      case PUBLIC_LIST_MODE:
      default:
        response = yield axios(`${API_URL}/photos`, options);
        yield put(itemsSuccess(response.data));
        break;
    }
  } catch (err) {
    yield put(itemsFail(err));
  }
}

export function* watchItems() {
  yield takeEvery(itemsPending.type, itemsFetch);
}
