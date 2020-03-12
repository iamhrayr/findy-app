import { AuthActionTypes, AuthState } from './types';
import * as types from './types';

const initialState: AuthState = {
  isAuthenticated: false,
  isAuthenticating: false,
  codeSent: false,
  codeConfirmed: false,
  error: {
    login: {},
    register: {},
    confirmPhone: {},
  },
  user: null,
  accessToken: null,
  refreshToken: null,
};

const errorReducer = (error: any, action: AuthActionTypes) => {
  switch (action.type) {
    case types.LOGIN_FAILURE:
      return {
        ...error,
        login: action.payload,
      };
    case types.REGISTER:
      return {
        ...error,
        register: {},
      };
    case types.REGISTER_FAILURE:
      return {
        ...error,
        register: action.payload,
      };
    case types.CONFIRM_PHONE_NUMBER_FAILURE:
      return {
        ...error,
        confirmPhone: action.payload,
      };
    case types.CONFIRM_PHONE_NUMBER:
      return {
        ...error,
        confirmPhone: {},
      };
    default:
      return error;
  }
};

export default (state = initialState, action: AuthActionTypes) => {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        isAuthenticating: true,
        error: errorReducer(state.error, action),
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: true,
        error: { ...initialState.error },
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    case types.REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        accessToken: action.payload,
      };
    case types.REGISTER_FAILURE:
    case types.LOGIN_FAILURE:
      return {
        ...initialState,
        error: errorReducer(state.error, action),
      };
    case types.REGISTER_SUCCESS:
      return {
        ...initialState,
        codeSent: true,
      };
    case types.CONFIRM_PHONE_NUMBER:
      return {
        ...initialState,
        error: errorReducer(state.error, action),
      };
    case types.CONFIRM_PHONE_NUMBER_FAILURE:
      return {
        ...initialState,
        error: errorReducer(state.error, action),
      };
    case types.CONFIRM_PHONE_NUMBER_SUCCESS:
      return {
        ...initialState,
        codeConfirmed: true,
      };
    case types.LOGOUT:
      return {
        ...initialState,
      };
    default: {
      return state;
    }
  }
};
