import { combineReducers } from 'redux';

import authReducer from './ducks/auth';

export default combineReducers({
  auth: authReducer,
});
