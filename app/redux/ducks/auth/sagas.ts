import { call, put, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import httpInstance from '@app/helpers/http';
import api from '@app/api';

import * as types from './types';
import { AuthActionTypes } from './types';
import {
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
  confirmPhoneNumberSuccess,
  confirmPhoneNumberFailure,
  refreshTokenSuccess,
  logout,
} from './actions';

// worker Sagas
function* loginHandler(action: AuthActionTypes) {
  try {
    // FIXME: fix (action as any) issue
    const res: AxiosResponse = yield call(api.login, (action as any).payload);
    yield put(loginSuccess(res.data));
    httpInstance.setAuthHeader(res.data.accessToken);
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

// function* refreshTokenHandler(action: AuthActionTypes) {
//   try {
//     const res: AxiosResponse = yield call(api.refreshToken, (action as any).payload);
//     console.log('action.meta', action.meta);
//     yield put({
//       type: 'REFRESH_TOKEN_SUCCESS',
//       payload: res.data.access,
//       meta: action.meta,
//     });
//     yield put(refreshTokenSuccess(res.data.access));
//     httpInstance.setAuthHeader(res.data.access);
//   } catch (error) {
//     // yield put({
//     //   type: 'REFRESH_TOKEN_FAILURE',
//     //   payload: error,
//     //   error: true,
//     //   meta: action.meta,
//     // });
//   }
// }

function* refreshTokenHandler(action: AuthActionTypes) {
  try {
    const res: AxiosResponse = yield call(api.refreshToken, (action as any).payload);
    yield put(refreshTokenSuccess(res.data.access, action.meta));
    httpInstance.setAuthHeader(res.data.access);
  } catch (error) {
    yield put(logout());
  }
}

function* logoutHandler() {
  httpInstance.removeAuthHeader();
}

// watchers
function* watcherSaga() {
  yield takeLatest(types.LOGIN, loginHandler);
  yield takeLatest(types.REGISTER, registerHandler);
  yield takeLatest(types.CONFIRM_PHONE_NUMBER, confirmPhoneNumberHandler);
  yield takeLatest(types.REFRESH_TOKEN, refreshTokenHandler);
  yield takeLatest(types.LOGOUT, logoutHandler);
}

export default watcherSaga;
