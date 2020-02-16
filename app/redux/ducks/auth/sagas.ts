import { put, takeLatest } from 'redux-saga/effects';
import { Action } from 'redux-actions';

import * as types from './types';
// import * as api from './api';

// worker Sagas
function* loginHandler(action: Action<any>) {
  try {
    // const user = yield call(api.login, action.payload);
    yield put({ type: '', data: action.payload });
  } catch (e) {
    yield put({ type: '', error: {} });
  }
}

// watchers
function* watcherSaga() {
  yield takeLatest(types.LOGIN, loginHandler);
}

export default watcherSaga;
