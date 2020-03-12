import { all } from 'redux-saga/effects';
import { authSagas } from './ducks/auth';
import { brandsModelsSagas } from './ducks/brandsModels';

export default function* rootSaga() {
  yield all([authSagas(), brandsModelsSagas()]);
}
