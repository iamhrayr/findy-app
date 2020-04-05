import { RootState } from '@app/redux/rootReducer';

import { getEntireStatus } from '../status/selectors';
import { LOGIN, REGISTER, CONFIRM_PHONE_NUMBER, REFRESH_TOKEN } from './types';

export const getUser = (state: RootState) => state.auth.user;

export const getIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;

export const getLoginStatus = (state: RootState) => getEntireStatus(state, LOGIN);

export const getRegisterStatus = (state: RootState) => getEntireStatus(state, REGISTER);

export const getRefreshTokenStatus = (state: RootState) =>
  getEntireStatus(state, REFRESH_TOKEN);

export const getConfirmPhoneNumberStatus = (state: RootState) =>
  getEntireStatus(state, CONFIRM_PHONE_NUMBER);
