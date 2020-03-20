import { combineReducers } from 'redux';
import createListReducer from '../../common/createListReducer';

import { fetchMyCars, ADD_CAR, EDIT_CAR, REMOVE_CAR } from './actions';
import { MyCarsState, MyCarsActionTypes } from './types';

const myCarsFetchSlice = createListReducer({
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

const myCarsReducer = (state: MyCarsState = initialState, action: MyCarsActionTypes) => {
  switch (action.type) {
    case ADD_CAR: {
      const { car } = action.payload;
      const newData = { ...state.data, [car.pk]: car };
      const newIds = [...state.ids, car.pk];
      return {
        ...state,
        data: newData,
        ids: newIds,
      };
    }
    case EDIT_CAR: {
      const { car, id } = action.payload;
      console.log({ car });
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
      return myCarsFetchSlice(state, action);
  }
};

export default combineReducers({
  myCars: myCarsReducer,
});
