import { combineReducers } from 'redux';

import createListReducer from '../../common/createListReducer';

import { fetchMyCars, fetchProfileSettings, editProfileSettings } from './actions';
import {
  ADD_CAR,
  EDIT_CAR,
  REMOVE_CAR,
  CHANGE_PREFERENCES,
  MyCarsState,
  SettingsState,
  PreferencesState,
} from './types';

const myCarsFetchReducer = createListReducer({
  loadingAction: fetchMyCars.TRIGGER,
  failureAction: fetchMyCars.FAILURE,
  successAction: fetchMyCars.SUCCESS,
});

const initialState = {
  loading: false,
  loaded: false,
  data: {},
  ids: [],
  error: '',
};

const myCarsReducer = (state: MyCarsState = initialState, action: Action) => {
  switch (action.type) {
    case ADD_CAR: {
      const { car, sam } = action.payload;
      const newData = { ...state.data, [car.pk]: car, sam };
      const newIds = [...state.ids, car.pk];
      return {
        ...state,
        data: newData,
        ids: newIds,
      };
    }
    case EDIT_CAR: {
      const { car, id } = action.payload;
      const newData = {
        ...state.data,
        [id]: car,
      };
      return {
        ...state,
        data: newData,
      };
    }
    case REMOVE_CAR: {
      const { id } = action.payload;
      const newData = { ...state.data };
      const newIds = state.ids.filter(_id => _id !== id);
      delete newData[id];
      return {
        ...state,
        data: newData,
        ids: newIds,
      };
    }
    default:
      return myCarsFetchReducer(state, action);
  }
};

const settingsReducer = (
  state: SettingsState = {
    loading: false,
    loaded: false,
    data: {
      notificationMethod: null,
      showPhoneNumber: null,
    },
  },
  action: Action,
) => {
  switch (action.type) {
    case fetchProfileSettings.TRIGGER:
      return {
        ...state,
        loading: true,
      };
    case fetchProfileSettings.SUCCESS:
      return {
        loading: false,
        loaded: true,
        data: action.payload,
      };
    case editProfileSettings.SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

const preferencesReducer = (
  state: PreferencesState = {
    theme: 'light',
    language: 'en',
  },
  action: Action,
) => {
  switch (action.type) {
    case CHANGE_PREFERENCES:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default combineReducers({
  myCars: myCarsReducer,
  settings: settingsReducer,
  preferences: preferencesReducer,
});
