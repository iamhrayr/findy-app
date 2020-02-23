import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import AsyncStorage from '@react-native-community/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
// import Reactotron from '../configs/reactotron';

// AsyncStorage.clear();

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // whitelist: ['auth.user', 'auth.isAuthenticated', 'auth.isAuthenticating'],
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  persistedReducer,
  composeEnhancers(
    applyMiddleware(sagaMiddleware),
    //Reactotron.createEnhancer()
  ),
);

const persistor = persistStore(store as any);

sagaMiddleware.run(rootSaga);

export { store, persistor };
