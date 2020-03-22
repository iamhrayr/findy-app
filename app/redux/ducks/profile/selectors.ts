import { createSelector } from 'reselect';

import { RootState } from '@app/redux/rootReducer';
import { arrayFromIdMap } from '@app/helpers/array';

export const getProfileCars = (state: RootState) => state.profile.myCars;
export const getProfileSettings = (state: RootState) => state.profile.settings;

export const getMyCars = createSelector([getProfileCars], profileCars =>
  arrayFromIdMap(profileCars.data, profileCars.ids),
);

export const getIsMyCarsLoading = createSelector(
  [getProfileCars],
  profileCars => profileCars.loading,
);

export const getIsMyCarsLoaded = createSelector(
  [getProfileCars],
  profileCars => profileCars.loaded,
);

export const getIsProfileSettingsLoading = createSelector(
  [getProfileSettings],
  profileSettings => profileSettings.loading,
);

export const getIsProfileSettingsLoaded = createSelector(
  [getProfileSettings],
  profileSettings => profileSettings.loaded,
);
