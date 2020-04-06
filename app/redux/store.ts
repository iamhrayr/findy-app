import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { middleware as thunkMiddleware } from 'redux-saga-thunk';
import { persistStore } from 'redux-persist';
import { showMessage } from 'react-native-flash-message';

import i18n from '@app/i18n';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

// AsyncStorage.clear();

const sagaMiddleware = createSagaMiddleware({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onError: (error: Error, { sagaStack: string }) => {
    showMessage({
      type: 'danger',
      message: i18n.t('bad_error_restart_app'),
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
