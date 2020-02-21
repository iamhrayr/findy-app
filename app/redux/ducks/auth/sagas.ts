import { call, put, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import * as types from './types';
import { AuthActionTypes } from './types';
import {
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
  confirmPhoneNumberSuccess,
  confirmPhoneNumberFailure,
} from './actions';
import api from './api';

// worker Sagas
function* loginHandler(action: AuthActionTypes) {
  try {
    //FIXME: fix (action as any) issue
    const res: AxiosResponse = yield call(api.login, (action as any).payload);
    yield put(loginSuccess(res.data));
    // action.success(res.data);
  } catch (error) {
    // FIXME: response could be undefined if it's network error for example
    yield put(loginFailure(error.response.data));
  }
}

function* registerHandler(action: AuthActionTypes) {
  try {
    const res: AxiosResponse = yield call(api.register, (action as any).payload);
    yield put(registerSuccess(res.data));
  } catch (error) {
    yield put(registerFailure(error.response.data));
  }
}

function* confirmPhoneNumberHandler(action: AuthActionTypes) {
  try {
    yield call(api.confirmPhoneNumber, (action as any).payload);
    yield put(confirmPhoneNumberSuccess());
  } catch (error) {
    yield put(confirmPhoneNumberFailure(error.response.data));
  }
}

// watchers
function* watcherSaga() {
  yield takeLatest(types.LOGIN, loginHandler);
  yield takeLatest(types.REGISTER, registerHandler);
  yield takeLatest(types.CONFIRM_PHONE_NUMBER, confirmPhoneNumberHandler);
}

export default watcherSaga;
