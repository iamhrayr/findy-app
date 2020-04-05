import { AuthState } from './types';
import * as types from './types';

import {
  login,
  register,
  confirmPhoneNumber,
  updateUser,
  refreshToken,
  changeAvatar,
} from './actions';

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  accessToken: null,
  refreshToken: null,
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case login.SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    case updateUser.SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    case changeAvatar.SUCCESS:
      console.log('action.payload', action.payload);
      return {
        ...state,
        user: {
          ...state.user,
          avatar: action.payload,
        },
      };
    case refreshToken.SUCCESS:
      return {
        ...state,
        accessToken: action.payload,
      };
    case register.SUCCESS:
      return {
        ...initialState,
        codeSent: true,
      };
    case confirmPhoneNumber.SUCCESS:
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
