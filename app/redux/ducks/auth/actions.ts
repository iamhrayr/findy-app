// import { Action, ActionCreator, Dispatch } from 'redux';
// import * as types from './types';
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  CONFIRM_PHONE_NUMBER,
  CONFIRM_PHONE_NUMBER_SUCCESS,
  CONFIRM_PHONE_NUMBER_FAILURE,
  REFRESH_TOKEN,
  REFRESH_TOKEN_SUCCESS,
  AuthActionTypes,
  LoginSuccessPayload,
  RegisterSuccessPayload,
} from './types';

export const login = (data: {
  phoneNumber: string;
  password: string;
}): AuthActionTypes => ({
  type: LOGIN,
  payload: data,
});

export const loginSuccess = (data: LoginSuccessPayload): AuthActionTypes => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

export const loginFailure = (error: Error): AuthActionTypes => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const register = (data: {
  phoneNumber: string;
  password: string;
}): AuthActionTypes => ({
  type: REGISTER,
  payload: data,
});

export const registerSuccess = (data: RegisterSuccessPayload): AuthActionTypes => ({
  type: REGISTER_SUCCESS,
  payload: data,
});

export const registerFailure = (error: any): AuthActionTypes => ({
  type: REGISTER_FAILURE,
  payload: error,
});

export const confirmPhoneNumber = (code: string): AuthActionTypes => ({
  type: CONFIRM_PHONE_NUMBER,
  payload: code,
});

export const confirmPhoneNumberSuccess = (): AuthActionTypes => ({
  type: CONFIRM_PHONE_NUMBER_SUCCESS,
});

export const confirmPhoneNumberFailure = (error: any): AuthActionTypes => ({
  type: CONFIRM_PHONE_NUMBER_FAILURE,
  payload: error,
});

export const logout = (): AuthActionTypes => ({
  type: LOGOUT,
});

// const meta = { thunk: true };

export const refreshToken = (refres: string): AuthActionTypes => ({
  type: REFRESH_TOKEN,
  payload: refres,
  meta: { thunk: true },
});

export const refreshTokenSuccess = (token: string, meta): AuthActionTypes => ({
  type: REFRESH_TOKEN_SUCCESS,
  payload: token,
  meta,
});
