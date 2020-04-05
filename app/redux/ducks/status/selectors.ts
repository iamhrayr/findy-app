import { createSelector } from 'reselect';
import { RootState } from '../../rootReducer';

export const getStatus = (state: RootState) => state.status.status;
export const getStatusType = (state: RootState, type: string) => type;
export const getError = (state: RootState) => state.status.error;
export const getTimestamp = (state: RootState) => state.status.timestamp;

export const getIsLoading = createSelector(
  [getStatus, getStatusType],
  (status: any, type: string) => status[type] === 'TRIGGER',
);

export const getHasSuccess = createSelector(
  [getStatus, getStatusType],
  (status: any, type: string) => status[type] === 'SUCCESS',
);

export const getHasError = createSelector(
  [getStatus, getStatusType],
  (status: any, type: string) => status[type] === 'FAILURE',
);

export const getErrorMessage = createSelector(
  [getError, getStatusType],
  (error: any, type: string) => error[type],
);

export const getSuccessDate = createSelector(
  [getTimestamp, getStatusType],
  (timestamp: any, type: string) => timestamp[type],
);

export const getEntireStatus = createSelector(
  [getStatus, getError, getTimestamp, getStatusType],
  (status: any, error: any, timestamp: any, type: string) => ({
    loading: status[type] === 'TRIGGER',
    loaded: status[type] === 'SUCCESS',
    timestamp: timestamp[type],
    error: error[type],
  }),
);
