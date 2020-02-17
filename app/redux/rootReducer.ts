import { combineReducers } from 'redux';

import authReducer from './ducks/auth';

const rootReducer = combineReducers({
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
