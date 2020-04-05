import createListReducer from '../../common/createListReducer';

import { fetchEvents } from './actions';

const eventsReducer = createListReducer({
  loadingAction: fetchEvents.TRIGGER,
  failureAction: fetchEvents.FAILURE,
  successAction: fetchEvents.SUCCESS,
});

export default eventsReducer;
