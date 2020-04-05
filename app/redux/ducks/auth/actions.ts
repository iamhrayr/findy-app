import { createRoutine } from 'redux-saga-routines';
import { createAction } from 'redux-actions';

import {
  LOGIN,
  LOGOUT,
  REGISTER,
  CONFIRM_PHONE_NUMBER,
  REFRESH_TOKEN,
  UPDATE_USER,
  CHANGE_AVATAR,
} from './types';

// action creators
export const logout = createAction(LOGOUT);

// routines
export const login = createRoutine(LOGIN);
export const register = createRoutine(REGISTER);
export const confirmPhoneNumber = createRoutine(CONFIRM_PHONE_NUMBER);
export const refreshToken = createRoutine(REFRESH_TOKEN);
export const updateUser = createRoutine(UPDATE_USER);
export const changeAvatar = createRoutine(CHANGE_AVATAR);
