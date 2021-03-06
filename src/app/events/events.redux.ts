import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';

export interface IEvent {
  start: Date;
  end: Date;
  id: any;
  title: string;
  description: string;
  [key: string]: any;
}

export interface IEvents {
  events: IEvent[];
}

export const initialState: IEvents = {
  events: [],
};

const getAllEvents = createAction<{
  id: number;
}>('GET_ALL_EVENTS');

const eventsSlice = createSlice({
  name: 'events',
  initialState: initialState,
  reducers: {
    /** sent the events currently stored in firebase */
    setEvent(state, action: PayloadAction<IEvents>) {
      return {
        ...state,
        events: action.payload.events,
      };
    },
  },
});

const { actions } = eventsSlice;

export const { reducer: eventsReducer, name: eventsSliceKey } = eventsSlice;
export const eventsActions = {
  ...actions,
  getAllEvents,
};
