import { call, put, takeLatest } from 'redux-saga/effects';

import * as types from './types';
import api from './api';

// worker Sagas
function* loginHandler(action: any) {
  try {
    const user = yield call(api.login, action.payload);
    console.log('user', user);
    yield put({ type: '', data: user });
  } catch (e) {
    console.log('eeeeee', e);
    yield put({ type: '', error: {} });
  }
}

// watchers
function* watcherSaga() {
  yield takeLatest(types.LOGIN, loginHandler);
}

export default watcherSaga;
