import { Car } from '@app/models/Car';
import { Settings } from '@app/models/User';

export type MyCarsState = {
  loading: boolean;
  loaded: boolean;
  data: KeyMap<Car>;
  ids: Array<Id>;
  error?: any;
};

export type SettingsState = {
  loading: boolean;
  loaded: boolean;
  data: NullableProps<Settings>;
};

export type ProfileState = {
  myCars: MyCarsState;
  settings: SettingsState;
};

export const REMOVE_CAR = '@app/profile/REMOVE_CAR';
export const EDIT_CAR = '@app/profile/EDIT_CAR';
export const ADD_CAR = '@app/profile/ADD_CAR';
export const FETCH_MY_CARS = '@app/profile/FETCH_MY_CARS';
export const UPDATE_SETTINGS_UPDATED = '@app/profile/UPDATE_SETTINGS_UPDATED';
export const FETCH_PROFILE_SETTINGS = '@app/profile/FETCH_PROFILE_SETTINGS';
