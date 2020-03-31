import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { middleware as thunkMiddleware } from 'redux-saga-thunk';
import { persistStore } from 'redux-persist';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
// import Reactotron from '../configs/reactotron';

// AsyncStorage.clear();

const sagaMiddleware = createSagaMiddleware();

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunkMiddleware, sagaMiddleware),
    //Reactotron.createEnhancer()
  ),
);

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
