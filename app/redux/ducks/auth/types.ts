// redux action types
export const LOGIN = '@app/auth/LOGIN';
export const LOGIN_SUCCESS = '@app/auth/LOGIN_SUCCESS';
export const LOGIN_FAILURE = '@app/auth/LOGIN_FAILURE';

export const REGISTER = '@app/auth/REGISTER';
export const REGISTER_SUCCESS = '@app/auth/REGISTER_SUCCESS';
export const REGISTER_FAILURE = '@app/auth/REGISTER_FAILURE';

export type User = {
  pk: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  country: string;
};

export type AuthState = {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
};

export type LoginSuccessPayload = {
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
  error: {};
};

export type AuthActionTypes = LoginAction | LoginSuccessAction | LoginFailureAction;
