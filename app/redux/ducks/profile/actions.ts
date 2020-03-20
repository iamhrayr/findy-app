import { createRoutine } from 'redux-saga-routines';
import { createAction } from 'redux-actions';

import { ProfilePayload } from './types';

// action types
export const REMOVE_CAR = '@app/profile/REMOVE_CAR';
export const EDIT_CAR = '@app/profile/EDIT_CAR';
export const ADD_CAR = '@app/profile/ADD_CAR';
export const FETCH_MY_CARS = '@app/profile/FETCH_MY_CARS';

// action creators
export const removeCar = createAction<ProfilePayload>(REMOVE_CAR);
export const editCar = createAction<ProfilePayload>(EDIT_CAR);
export const addCar = createAction<ProfilePayload>(ADD_CAR);

// routines
export const fetchMyCars = createRoutine<ProfilePayload>(FETCH_MY_CARS);
