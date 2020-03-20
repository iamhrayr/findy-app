import { createSelector } from 'reselect';

import { RootState } from '@app/redux/rootReducer';
import { arrayFromIdMap } from '@app/helpers/array';

const getProfileCars = (state: RootState) => state.profile.myCars;

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
