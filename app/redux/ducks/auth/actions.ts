// import { Action, ActionCreator, Dispatch } from 'redux';
// import * as types from './types';
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  AuthActionTypes,
  LoginSuccessPayload,
} from './types';

export const login = (phoneNumber: string, password: string) => ({
  type: LOGIN,
  payload: { phoneNumber, password },
});

export const loginSuccess = (data: LoginSuccessPayload): AuthActionTypes => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

export const loginFailure = () => ({
  type: LOGIN_FAILURE,
});
