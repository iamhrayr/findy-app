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

export const LOGOUT = '@app/auth/LOGOUT';

export type User = {
  pk: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  country: string;
};

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

export type AuthActionTypes =
  | LoginAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutAction
  | RegisterAction
  | RegisterSuccessAction
  | RegisterFailureAction
  | ConfirmPhoneNumberAction
  | ConfirmPhoneNumberSuccessAction
  | ConfirmPhoneNumberFailureAction;
