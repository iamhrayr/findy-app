import { combineReducers } from 'redux';

import authReducer from './ducks/auth';
import brandsModelsReducer from './ducks/brandsModels';

const rootReducer = combineReducers({
  auth: authReducer,
  brandsModels: brandsModelsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
