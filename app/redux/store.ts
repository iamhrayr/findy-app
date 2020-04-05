import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { middleware as thunkMiddleware } from 'redux-saga-thunk';
import { persistStore } from 'redux-persist';
import { showMessage } from 'react-native-flash-message';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

// AsyncStorage.clear();

const sagaMiddleware = createSagaMiddleware({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onError: (error: Error, { sagaStack: string }) => {
    showMessage({
      type: 'danger',
      message: 'Something bad happend. Restart the app',
    });
    // TODO: log the error
  },
});

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware, sagaMiddleware)),
);

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
