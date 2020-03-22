import { call, put, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { showMessage } from 'react-native-flash-message';

import httpInstance from '@app/helpers/http';
import api from '@app/api';

import * as types from './types';
// import { AuthActionTypes } from './types';
import {
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
  confirmPhoneNumberSuccess,
  confirmPhoneNumberFailure,
  refreshTokenSuccess,
  updateUserSuccess,
  logout,
} from './actions';

// worker Sagas
function* loginHandler(action: Action) {
  try {
    const res: AxiosResponse = yield call(api.login, action.payload);
    yield put(loginSuccess(res.data));
    httpInstance.setAuthHeader(res.data.accessToken);
  } catch (error) {
    // FIXME: response could be undefined if it's network error for example
    yield put(loginFailure(error.response.data));
  }
}

function* registerHandler(action: Action) {
  try {
    const res: AxiosResponse = yield call(api.register, action.payload);
    yield put(registerSuccess(res.data));
  } catch (error) {
    yield put(registerFailure(error.response.data));
  }
}

function* confirmPhoneNumberHandler(action: Action) {
  try {
    yield call(api.confirmPhoneNumber, action.payload);
    yield put(confirmPhoneNumberSuccess());
  } catch (error) {
    yield put(confirmPhoneNumberFailure(error.response.data));
  }
}

function* refreshTokenHandler(action: Action) {
  try {
    const res: AxiosResponse = yield call(api.refreshToken, action.payload);
    yield put(refreshTokenSuccess(res.data.access));
    httpInstance.setAuthHeader(res.data.access);
  } catch (error) {
    yield put(logout());
  }
}

function* updateUserHandler(action: Action) {
  try {
    const res: AxiosResponse = yield call(api.editUser, action.payload);
    yield put(updateUserSuccess(res.data));
    showMessage({
      type: 'success',
      message: 'Updated successfully',
    });
  } catch (error) {
    // console.log(error);
    showMessage({
      type: 'danger',
      message: 'Something went wrong',
    });
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
  yield takeLatest(types.UPDATE_USER, updateUserHandler);
}

export default watcherSaga;
