import { User } from '@app/types/User';

export type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
};

export const LOGIN = '@app/auth/LOGIN';
export const REGISTER = '@app/auth/REGISTER';
export const CONFIRM_PHONE_NUMBER = '@app/auth/CONFIRM_PHONE_NUMBER';
export const UPDATE_USER = '@app/auth/UPDATE_USER';
export const REFRESH_TOKEN = '@app/auth/REFRESH_TOKEN';
export const CHANGE_AVATAR = '@app/auth/CHANGE_AVATAR';
export const LOGOUT = '@app/auth/LOGOUT';
