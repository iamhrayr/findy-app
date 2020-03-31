import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import statusReducer from './ducks/status';
import authReducer from './ducks/auth';
import brandsModelsReducer from './ducks/brandsModels';
import profileReducer from './ducks/profile';
import eventsReducer from './ducks/events';

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
};

const profilePersistConfig = {
  key: 'profile',
  storage: AsyncStorage,
  whitelist: ['preferences'],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  brandsModels: brandsModelsReducer,
  profile: persistReducer(profilePersistConfig, profileReducer),
  events: eventsReducer,
  status: statusReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
