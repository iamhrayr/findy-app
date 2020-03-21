import { call, put, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import api from '@app/api';
import { array2IdMap } from '@app/helpers/array';

import { fetchMyCars } from './actions';

// worker Sagas
// function* fetchMyCarsHandler(action: ReturnType<typeof fetchMyCars.trigger>) {
function* fetchMyCarsHandler() {
  try {
    const res: AxiosResponse = yield call(api.fetchMyCars);
    const { map, ids } = array2IdMap(res.data);
    yield put(fetchMyCars.success({ data: map, ids }));
  } catch (error) {
    yield put(fetchMyCars.failure(error.response.data));
  }
}

// watchers
function* watcherSaga() {
  yield takeLatest(fetchMyCars.TRIGGER, fetchMyCarsHandler);
}

export default watcherSaga;
