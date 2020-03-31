import { createRoutine } from 'redux-saga-routines';
import { createAction } from 'redux-actions';

import {
  REMOVE_CAR,
  EDIT_CAR,
  ADD_CAR,
  FETCH_MY_CARS,
  UPDATE_SETTINGS_UPDATED,
  FETCH_PROFILE_SETTINGS,
  CHANGE_PREFERENCES,
} from './types';

// action creators
export const removeCar = createAction(REMOVE_CAR);
export const editCar = createAction(EDIT_CAR);
export const addCar = createAction(ADD_CAR);
export const changePreferences = createAction(CHANGE_PREFERENCES);

// routines
export const fetchMyCars = createRoutine(FETCH_MY_CARS);
export const fetchProfileSettings = createRoutine(FETCH_PROFILE_SETTINGS);
export const updateProfileSettings = createRoutine(UPDATE_SETTINGS_UPDATED);
