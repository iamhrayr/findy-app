import { combineReducers } from 'redux';

const getActionType = (action: Action) => action.type.split('/').slice(0, -1).join('/');

const getActionStatus = (action: Action) => action.type.split('/').slice(-1)[0];

const statuses = {
  trigger: 'TRIGGER',
  failure: 'FAILURE',
  success: 'SUCCESS',
};

const statusReducer = (state = {}, action: Action) => {
  const actionStatus = getActionStatus(action);
  const actionType = getActionType(action);

  if (
    actionStatus !== statuses.trigger &&
    actionStatus !== statuses.success &&
    actionStatus !== statuses.failure
  ) {
    return state;
  }

  return {
    ...state,
    [actionType]: actionStatus,
  };
};

const timestampReducer = (state = {}, action: Action) => {
  const actionStatus = getActionStatus(action);
  const actionType = getActionType(action);

  if (actionStatus !== statuses.success) {
    return state;
  }

  return {
    ...state,
    [actionType]: Date.now(),
  };
};

const errorReducer = (state = {}, action: Action) => {
  const actionStatus = getActionStatus(action);
  const actionType = getActionType(action);

  if (actionStatus === statuses.failure) {
    return {
      ...state,
      [actionType]: action.payload,
    };
  }

  if (actionStatus !== statuses.success) {
    return {
      ...state,
      [actionType]: null,
    };
  }

  return state;
};

export default combineReducers({
  status: statusReducer,
  timestamp: timestampReducer,
  error: errorReducer,
});
