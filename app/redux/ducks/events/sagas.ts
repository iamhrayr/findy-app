import { call, put, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import api from '@app/api';
import { array2IdMap } from '@app/helpers/array';

import { fetchEvents } from './actions';

// worker Sagas
function* fetchEventsHandler() {
  try {
    const res: AxiosResponse = yield call(api.fetchThreads);
    // TODO: fix once extra thread fixed in api
    const aa = res.data.map((item: any) => item.thread);
    const { map, ids } = array2IdMap(aa);
    yield put(fetchEvents.success({ data: map, ids }));
  } catch (error) {
    yield put(fetchEvents.failure(error.response.data));
  }
}

// watchers
function* watcherSaga() {
  yield takeLatest(fetchEvents.TRIGGER, fetchEventsHandler);
}

export default watcherSaga;
