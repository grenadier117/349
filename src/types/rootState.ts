import { IEvents } from 'app/events/events.redux';
import { IGlobal } from 'app/global/global.redux';

export interface RootState {
  global?: IGlobal;
  events?: IEvents;
}
