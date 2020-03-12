import { call, put, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import * as types from './types';
import { fetchBrandsAndModelsSuccess, fetchBrandsAndModelsFailure } from './actions';
import api from './api';

// worker Sagas
function* fetchBrandsAndModelsHandler() {
  try {
    const res: AxiosResponse = yield call(api.fetchBrandsAndModels);
    yield put(fetchBrandsAndModelsSuccess(res.data));
  } catch (error) {
    yield put(fetchBrandsAndModelsFailure(error.response.data));
  }
}

// watchers
function* watcherSaga() {
  yield takeLatest(types.FETCH_BRANDS_AND_MODELS, fetchBrandsAndModelsHandler);
}

export default watcherSaga;
