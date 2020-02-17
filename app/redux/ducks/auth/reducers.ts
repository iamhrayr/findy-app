import { AuthActionTypes, AuthState } from './types';
import * as types from './types';

const initialState: AuthState = {
  isAuthenticated: false,
  isAuthenticating: false,
  user: null,
  accessToken: null,
  refreshToken: null,
};

export default (state = initialState, action: AuthActionTypes) => {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        isAuthenticating: true,
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    case types.LOGIN_FAILURE:
      return {
        ...initialState,
      };
    default: {
      return state;
    }
  }
};
