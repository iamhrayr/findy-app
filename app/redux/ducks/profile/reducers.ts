import { combineReducers } from 'redux';

import createListReducer from '../../common/createListReducer';

import { fetchMyCars, ADD_CAR, EDIT_CAR, REMOVE_CAR } from './actions';
import { MyCarsState } from './types';

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

export default combineReducers({
  myCars: myCarsReducer,
});
