import { createRoutine } from 'redux-saga-routines';

import { FETCH_EVENTS } from './types';

// action creators

// routines
export const fetchEvents = createRoutine(FETCH_EVENTS);
