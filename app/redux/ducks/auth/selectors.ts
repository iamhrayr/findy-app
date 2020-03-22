import { RootState } from '@app/redux/rootReducer';

export const getUser = (state: RootState) => state.auth.user;
