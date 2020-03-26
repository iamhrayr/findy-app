import { combineReducers } from 'redux';

import statusReducer from './ducks/status';
import authReducer from './ducks/auth';
import brandsModelsReducer from './ducks/brandsModels';
import profileReducer from './ducks/profile';
import eventsReducer from './ducks/events';

const rootReducer = combineReducers({
  auth: authReducer,
  brandsModels: brandsModelsReducer,
  profile: profileReducer,
  status: statusReducer,
  events: eventsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
