import {
  FETCH_BRANDS_AND_MODELS,
  FETCH_BRANDS_AND_MODELS_SUCCESS,
  FETCH_BRANDS_AND_MODELS_FAILURE,
  BrandsAndModelsActionTypes,
  BrandsAndModels,
} from './types';

export const fetchBrandsAndModels = (): BrandsAndModelsActionTypes => ({
  type: FETCH_BRANDS_AND_MODELS,
});

export const fetchBrandsAndModelsSuccess = (
  data: BrandsAndModels,
): BrandsAndModelsActionTypes => ({
  type: FETCH_BRANDS_AND_MODELS_SUCCESS,
  payload: data,
});

export const fetchBrandsAndModelsFailure = (
  error: Error,
): BrandsAndModelsActionTypes => ({
  type: FETCH_BRANDS_AND_MODELS_FAILURE,
  payload: error,
});
