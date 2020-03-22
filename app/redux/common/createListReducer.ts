type Actions = {
  loadingAction: string;
  successAction: string;
  failureAction: string;
  appendAction?: string;
};
type State = {
  loading: boolean;
  loaded: boolean;
  data: KeyMap<any>;
  ids: Array<Id>;
  error?: any;
};

const createListReducer = ({
  loadingAction,
  successAction,
  failureAction,
  appendAction,
}: Actions) => {
  const initialState: State = {
    loading: false,
    loaded: false,
    data: {},
    ids: [],
    error: '',
  };

  return (state = initialState, { type, payload }: any) => {
    switch (type) {
      case loadingAction:
        return { ...state, loading: true };
      case successAction:
        return {
          ...state,
          loading: false,
          loaded: true,
          data: payload.data,
          ids: payload.ids,
        };
      case failureAction:
        return { ...state, loading: false, error: payload.error };
      case appendAction:
        return {
          ...state,
          data: { ...state.data, ...payload.data },
          ids: [...state.ids, payload.ids],
        };
      default:
        return state;
    }
  };
};

export default createListReducer;
