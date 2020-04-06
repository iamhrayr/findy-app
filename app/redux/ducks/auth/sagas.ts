import { call, put, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { showMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-community/async-storage';

import httpInstance from '@app/helpers/http';
import api from '@app/api';
import i18n from '@app/i18n';

import * as types from './types';
import {
  login,
  register,
  confirmPhoneNumber,
  refreshToken,
  updateUser,
  changeAvatar,
  logout,
} from './actions';

// worker Sagas
function* loginHandler(action: Action) {
  try {
    const res: AxiosResponse = yield call(api.login, action.payload);
    yield put(login.success(res.data));
    yield call([httpInstance, 'setAuthHeader'], res.data.accessToken);
  } catch (error) {
    yield put(login.failure(error.response.data));
  }
}

function* registerHandler(action: Action) {
  try {
    const res: AxiosResponse = yield call(api.register, action.payload);
    yield put(register.success(res.data));
  } catch (error) {
    yield put(register.failure(error.response.data));
  }
}

function* confirmPhoneNumberHandler(action: Action) {
  try {
    yield call(api.confirmPhoneNumber, action.payload);
    yield put(confirmPhoneNumber.success());
  } catch (error) {
    yield put(confirmPhoneNumber.failure(error.response.data));
  }
}

function* refreshTokenHandler(action: Action) {
  try {
    const res: AxiosResponse = yield call(api.refreshToken, action.payload);
    yield put(refreshToken.success(res.data.access));
    yield call([httpInstance, 'setAuthHeader'], res.data.access);
  } catch (error) {
    yield put(logout());
  }
}

function* updateUserHandler(action: Action) {
  try {
    const res: AxiosResponse = yield call(api.editUser, action.payload);
    yield put(updateUser.success(res.data));
    showMessage({
      type: 'success',
      message: i18n.t('successfully_updated'),
    });
  } catch (error) {
    showMessage({
      type: 'danger',
      message: i18n.t('something_went_wrong'),
    });
  }
}

function* changeAvatarHandler(action: Action) {
  try {
    const res: AxiosResponse = yield call(api.changeAvatar, action.payload);
    yield put(changeAvatar.success(res.data.avatar));
  } catch (error) {
    showMessage({
      type: 'danger',
      message: i18n.t('something_went_wrong'),
    });
  }
}

function* logoutHandler() {
  yield call(AsyncStorage.clear);
  yield call([httpInstance, 'removeAuthHeader']);
}

// watchers
function* watcherSaga() {
  yield takeLatest(login.TRIGGER, loginHandler);
  yield takeLatest(register.TRIGGER, registerHandler);
  yield takeLatest(confirmPhoneNumber.TRIGGER, confirmPhoneNumberHandler);
  yield takeLatest(refreshToken.TRIGGER, refreshTokenHandler);
  yield takeLatest(updateUser.TRIGGER, updateUserHandler);
  yield takeLatest(changeAvatar.TRIGGER, changeAvatarHandler);
  yield takeLatest(types.LOGOUT, logoutHandler);
}

export default watcherSaga;
