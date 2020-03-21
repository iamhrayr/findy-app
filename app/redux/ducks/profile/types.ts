import { Car } from '@app/models/Car';

import { fetchMyCars, ADD_CAR, EDIT_CAR, REMOVE_CAR } from './actions';

export type MyCarsState = {
  loading: boolean;
  loaded: boolean;
  data: KeyMap<Car>;
  ids: Array<Id>;
  error?: any;
};

export type ProfileState = {
  myCars: MyCarsState;
};

export interface FetchMyCarsAction extends Action {
  type: typeof fetchMyCars.TRIGGER;
}

export interface FetchMyCarsSuccessAction extends Action {
  type: typeof fetchMyCars.SUCCESS;
  payload: { data: KeyMap<Car>; ids: Id[] };
}

export interface FetchMyCarsFailureAction extends Action {
  type: typeof fetchMyCars.FAILURE;
  payload: any;
}

export interface AddCarAction extends Action {
  type: typeof ADD_CAR;
  payload: { car: Car };
}

export interface EditCarAction extends Action {
  type: typeof EDIT_CAR;
  payload: { id: Id; car: Car };
}

export interface RemoveCarAction extends Action {
  type: typeof REMOVE_CAR;
  payload: { id: Id };
}

export type MyCarsActionTypes =
  | FetchMyCarsAction
  | FetchMyCarsSuccessAction
  | FetchMyCarsFailureAction
  | AddCarAction
  | EditCarAction
  | RemoveCarAction;
