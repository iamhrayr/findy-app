import { Car } from '@app/types/Car';
import { Settings } from '@app/types/User';

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

export type PreferencesState = {
  language: string;
  theme: string;
};

export type ProfileState = {
  myCars: MyCarsState;
  settings: SettingsState;
  preferences: PreferencesState;
};

export const REMOVE_CAR = '@app/profile/REMOVE_CAR';
export const EDIT_CAR = '@app/profile/EDIT_CAR';
export const ADD_CAR = '@app/profile/ADD_CAR';
export const FETCH_MY_CARS = '@app/profile/FETCH_MY_CARS';
export const UPDATE_SETTINGS_UPDATED = '@app/profile/UPDATE_SETTINGS_UPDATED';
export const FETCH_PROFILE_SETTINGS = '@app/profile/FETCH_PROFILE_SETTINGS';
export const CHANGE_PREFERENCES = '@app/profile/CHANGE_PREFERENCES';
