import { createAction } from 'redux-actions';

import {
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  REGISTER,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  // LoginPayload,
  // LoginSuccessPayload,
  // LoginFailurePayload,
  // RegisterPayload,
  // RegisterSuccessPayload,
  // RegisterFailurePayload,
} from './types';

// export const login = createAction<LoginPayload>(LOGIN);
// export const loginSuccess = createAction<LoginSuccessPayload>(LOGIN_SUCCESS);
// export const resetFailure = createAction<LoginFailurePayload>(LOGIN_FAILURE);

// export const register = createAction<RegisterPayload>(REGISTER);
// export const registerSuccess = createAction<RegisterSuccessPayload>(REGISTER_SUCCESS);
// export const registerFailure = createAction<RegisterFailurePayload>(REGISTER_FAILURE);

export const login = createAction(LOGIN);
export const loginSuccess = createAction(LOGIN_SUCCESS);
export const resetFailure = createAction(LOGIN_FAILURE);

export const register = createAction(REGISTER);
export const registerSuccess = createAction(REGISTER_SUCCESS);
export const registerFailure = createAction(REGISTER_FAILURE);
