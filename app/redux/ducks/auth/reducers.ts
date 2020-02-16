import { handleActions } from 'redux-actions';

import { AuthState } from './types';
import * as types from './types';

const initialState: AuthState = {
  isAuthenticated: false,
  isAuthenticating: false,
  user: null,
  token: null,
  refreshToken: null,
};

export default handleActions(
  {
    [types.LOGIN_FAILURE]: () => ({
      ...initialState,
    }),
    [types.LOGIN_SUCCESS]: (state: AuthState, action) => ({
      ...state,
      isAuthenticating: false,
      isAuthenticated: true,
      user: action.payload.user,
      token: action.payload.token,
      refreshToken: action.payload.refreshToken,
    }),
  },
  initialState,
);
