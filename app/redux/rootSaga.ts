import { all } from 'redux-saga/effects';

import { authSagas } from './ducks/auth';
import { brandsModelsSagas } from './ducks/brandsModels';
import { profileSagas } from './ducks/profile';

export default function* rootSaga() {
  yield all([authSagas(), brandsModelsSagas(), profileSagas()]);
}
