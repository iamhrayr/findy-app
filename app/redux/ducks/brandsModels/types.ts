// redux action types
export const FETCH_BRANDS_AND_MODELS = '@app/auth/FETCH_BRANDS_AND_MODELS';
export const FETCH_BRANDS_AND_MODELS_SUCCESS =
  '@app/auth/FETCH_BRANDS_AND_MODELS_SUCCESS';
export const FETCH_BRANDS_AND_MODELS_FAILURE =
  '@app/auth/FETCH_BRANDS_AND_MODELS_FAILURE';

export type Model = {
  pk: string;
  name: string;
  makePk: string;
};

export type Brand = {
  pk: string;
  name: string;
};

export type BrandsAndModels = {
  brands: Array<Brand>;
  models: Array<Model>;
};

export type BrandsAndModelsState = {
  loading: boolean;
  loaded: boolean;
  data: BrandsAndModels;
  // FIXME: what the fuck ara, why uncommenting this error breaks rootReducer type?
  error?: any;
};

export type FetchBrandsAndModelsAction = {
  type: typeof FETCH_BRANDS_AND_MODELS;
};

export type FetchBrandsAndModelsSuccessAction = {
  type: typeof FETCH_BRANDS_AND_MODELS_SUCCESS;
  payload: BrandsAndModels;
};

export type FetchBrandsAndModelsFailureAction = {
  type: typeof FETCH_BRANDS_AND_MODELS_FAILURE;
  payload: any;
};

export type BrandsAndModelsActionTypes =
  | FetchBrandsAndModelsAction
  | FetchBrandsAndModelsSuccessAction
  | FetchBrandsAndModelsFailureAction;
