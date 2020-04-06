import { call, put, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import httpInstance from '@app/helpers/http';
import api from '@app/api';
import { array2IdMap } from '@app/helpers/array';
import i18n from '@app/i18n';

import { CHANGE_PREFERENCES } from './types';
import { fetchMyCars, fetchProfileSettings, updateProfileSettings } from './actions';

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

function* fetchProfileSettingsHandler() {
  try {
    const res: AxiosResponse = yield call(api.fetchProfileSettings);
    yield put(fetchProfileSettings.success(res.data));
  } catch (error) {
    // TODO: show error toats
  }
}

function* updateProfileSettingsHandler(action: Action) {
  try {
    const res: AxiosResponse = yield call(api.changeProfileSettings, action.payload);
    yield put(updateProfileSettings.success(res.data));
  } catch (error) {
    // TODO: show error toats
  }
}

function* changePreferencesHandler(action: Action) {
  if (action.payload.language) {
    i18n.changeLanguage(action.payload.language);
    httpInstance.setLanguageHeader(action.payload.language);
  }
}

// watchers
function* watcherSaga() {
  yield takeLatest(fetchMyCars.TRIGGER, fetchMyCarsHandler);
  yield takeLatest(fetchProfileSettings.TRIGGER, fetchProfileSettingsHandler);
  yield takeLatest(updateProfileSettings.TRIGGER, updateProfileSettingsHandler);
  yield takeLatest(CHANGE_PREFERENCES, changePreferencesHandler);
}

export default watcherSaga;
