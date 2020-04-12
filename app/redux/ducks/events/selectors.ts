import { createSelector } from 'reselect';

import { RootState } from '@app/redux/rootReducer';
import { arrayFromIdMap } from '@app/helpers/array';

import { getEntireStatus } from '../status/selectors';
import { FETCH_EVENTS } from './types';

export const getEvents = createSelector([(state: RootState) => state.events], (events) =>
  arrayFromIdMap(events.data, events.ids),
);

export const getEventsStatus = (state: RootState) => getEntireStatus(state, FETCH_EVENTS);
