// import { Action } from 'redux-actions';

// export type LoginPayload = {
//   phoneNumber: string;
//   password: string;
// };

// export type LoginSuccessPayload = {
//   token: string;
//   refreshToken: string;
//   user: {
//     phoneNumber: string;
//   };
// };

// export type LoginFailurePayload = {};

// export type RegisterPayload = {
//   phoneNumber: string;
//   password: string;
// };

// export type RegisterSuccessPayload = {};

// export type RegisterFailurePayload = {};

// export type AuthActionTypes =
//   | Action<LoginPayload>
//   | Action<LoginSuccessPayload>
//   | Action<LoginFailurePayload>
//   | Action<RegisterPayload>
//   | Action<RegisterSuccessPayload>
//   | Action<RegisterFailurePayload>;

type User = {
  firstName: boolean;
  lastName: boolean;
  phoneNumber: string;
};

export type AuthState = {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  user?: User | null;
  token?: string | null;
  refreshToken?: string | null;
};

// redux action types
export const LOGIN = '@app/auth/LOGIN';
export const LOGIN_SUCCESS = '@app/auth/LOGIN_SUCCESS';
export const LOGIN_FAILURE = '@app/auth/LOGIN_FAILURE';

export const REGISTER = '@app/auth/REGISTER';
export const REGISTER_SUCCESS = '@app/auth/REGISTER_SUCCESS';
export const REGISTER_FAILURE = '@app/auth/REGISTER_FAILURE';
