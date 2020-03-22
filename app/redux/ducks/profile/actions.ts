import { createRoutine } from 'redux-saga-routines';
import { createAction } from 'redux-actions';

// action types
export const REMOVE_CAR = '@app/profile/REMOVE_CAR';
export const EDIT_CAR = '@app/profile/EDIT_CAR';
export const ADD_CAR = '@app/profile/ADD_CAR';
export const FETCH_MY_CARS = '@app/profile/FETCH_MY_CARS';
export const UPDATE_SETTINGS_UPDATED = '@app/profile/UPDATE_SETTINGS_UPDATED';
export const FETCH_PROFILE_SETTINGS = '@app/profile/FETCH_PROFILE_SETTINGS';

// action creators
export const removeCar = createAction(REMOVE_CAR);
export const editCar = createAction(EDIT_CAR);
export const addCar = createAction(ADD_CAR);

// routines
export const fetchMyCars = createRoutine(FETCH_MY_CARS);
export const fetchProfileSettings = createRoutine(FETCH_PROFILE_SETTINGS);
export const updateProfileSettings = createRoutine(UPDATE_SETTINGS_UPDATED);
