import { createSelector } from 'reselect';

import { RootState } from '@app/redux/rootReducer';
import { arrayFromIdMap } from '@app/helpers/array';

import { getEntireStatus } from '../status/selectors';
import { FETCH_MY_CARS } from './types';

export const getProfileCars = (state: RootState) => state.profile.myCars;
export const getProfileSettings = (state: RootState) => state.profile.settings;
export const getProfilePreferences = (state: RootState) => state.profile.preferences;

export const getMyCars = createSelector([getProfileCars], (profileCars) =>
  arrayFromIdMap(profileCars.data, profileCars.ids),
);

export const getMyCarsStatus = (state: RootState) =>
  getEntireStatus(state, FETCH_MY_CARS);

export const getIsProfileSettingsLoading = createSelector(
  [getProfileSettings],
  (profileSettings) => profileSettings.loading,
);

export const getIsProfileSettingsLoaded = createSelector(
  [getProfileSettings],
  (profileSettings) => profileSettings.loaded,
);
