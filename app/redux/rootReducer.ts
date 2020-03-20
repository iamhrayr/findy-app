import { combineReducers } from 'redux';

import authReducer from './ducks/auth';
import brandsModelsReducer from './ducks/brandsModels';
import profileReducer from './ducks/profile';

const rootReducer = combineReducers({
  auth: authReducer,
  brandsModels: brandsModelsReducer,
  profile: profileReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
