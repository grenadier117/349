import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { IEvents, initialState } from './events.redux';

const selectDomain = (state: RootState) => state?.events || initialState;

export const selectEvents = createSelector([selectDomain], (state: IEvents) =>
  state.events.map(item => ({
    ...item,
    start: new Date(item.start),
    end: new Date(item.end),
  })),
);
