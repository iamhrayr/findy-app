import { User } from '@app/models/User';

// redux action types
export const LOGIN = '@app/auth/LOGIN';
export const LOGIN_SUCCESS = '@app/auth/LOGIN_SUCCESS';
export const LOGIN_FAILURE = '@app/auth/LOGIN_FAILURE';

export const REGISTER = '@app/auth/REGISTER';
export const REGISTER_SUCCESS = '@app/auth/REGISTER_SUCCESS';
export const REGISTER_FAILURE = '@app/auth/REGISTER_FAILURE';

export const CONFIRM_PHONE_NUMBER = '@app/auth/CONFIRM_PHONE_NUMBER';
export const CONFIRM_PHONE_NUMBER_SUCCESS = '@app/auth/CONFIRM_PHONE_NUMBER_SUCCESS';
export const CONFIRM_PHONE_NUMBER_FAILURE = '@app/auth/CONFIRM_PHONE_NUMBER_FAILURE';

export const UPDATE_USER = '@app/auth/UPDATE_USER';
export const UPDATE_USER_SUCCESS = '@app/auth/UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = '@app/auth/UPDATE_USER_FAILURE';

export const REFRESH_TOKEN = '@app/auth/REFRESH_TOKEN';
export const REFRESH_TOKEN_SUCCESS = '@app/auth/REFRESH_TOKEN_SUCCESS';

export const LOGOUT = '@app/auth/LOGOUT';

export type AuthState = {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  codeSent: boolean;
  codeConfirmed: boolean;
  user: User | null;
  error: { [key: string]: any };
  accessToken: string | null;
  refreshToken: string | null;
};

export type LoginSuccessPayload = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

export type RegisterSuccessPayload = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

export type LoginAction = {
  type: typeof LOGIN;
  payload: {
    phoneNumber: string;
    password: string;
  };
};

export type LoginSuccessAction = {
  type: typeof LOGIN_SUCCESS;
  payload: LoginSuccessPayload;
};

export type LoginFailureAction = {
  type: typeof LOGIN_FAILURE;
  payload: any;
};

export type UpdateUserAction = {
  type: typeof UPDATE_USER;
  payload: Partial<User>;
};

export type UpdateUserSuccessAction = {
  type: typeof UPDATE_USER_SUCCESS;
  payload: Partial<User>;
};

export type RegisterAction = {
  type: typeof REGISTER;
  payload: {
    phoneNumber: string;
    password: string;
  };
};

export type RegisterSuccessAction = {
  type: typeof REGISTER_SUCCESS;
  payload: RegisterSuccessPayload;
};

export type RegisterFailureAction = {
  type: typeof REGISTER_FAILURE;
  payload: Error;
};

export type ConfirmPhoneNumberAction = {
  type: typeof CONFIRM_PHONE_NUMBER;
  payload: string;
};

export type ConfirmPhoneNumberSuccessAction = {
  type: typeof CONFIRM_PHONE_NUMBER_SUCCESS;
};

export type ConfirmPhoneNumberFailureAction = {
  type: typeof CONFIRM_PHONE_NUMBER_FAILURE;
  payload: Error;
};

export type LogoutAction = {
  type: typeof LOGOUT;
};

export type RefreshTokenAction = {
  type: typeof REFRESH_TOKEN;
  payload: string;
};

export type RefreshTokenSuccessAction = {
  type: typeof REFRESH_TOKEN_SUCCESS;
  payload: string;
};

export type AuthActionTypes =
  | LoginAction
  | LoginSuccessAction
  | LoginFailureAction
  | UpdateUserAction
  | UpdateUserSuccessAction
  | LogoutAction
  | RegisterAction
  | RegisterSuccessAction
  | RegisterFailureAction
  | ConfirmPhoneNumberAction
  | ConfirmPhoneNumberSuccessAction
  | ConfirmPhoneNumberFailureAction
  | RefreshTokenAction
  | RefreshTokenSuccessAction;
