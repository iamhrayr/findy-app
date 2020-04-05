import { BrandsAndModelsActionTypes, BrandsAndModelsState } from './types';
import * as types from './types';

const initialState: BrandsAndModelsState = {
  loading: false,
  loaded: false,
  data: {
    brands: [],
    models: [],
  },
  error: null,
};

export default (state = initialState, action: BrandsAndModelsActionTypes) => {
  switch (action.type) {
    case types.FETCH_BRANDS_AND_MODELS:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_BRANDS_AND_MODELS_SUCCESS:
      return {
        loading: false,
        loaded: true,
        data: action.payload,
      };
    case types.FETCH_BRANDS_AND_MODELS_FAILURE:
      return {
        ...initialState,
        error: action.payload,
      };
    default: {
      return state;
    }
  }
};
