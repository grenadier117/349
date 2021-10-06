import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState, IGlobal, defaultSnackbar } from './global.redux';

const selectDomain = (state: RootState) => state?.global || initialState;

export const selectSnackBar = createSelector([selectDomain], (globalState: IGlobal) =>
  globalState.snackbar.queue.length > 0 ? globalState.snackbar.queue[0] : defaultSnackbar,
);
export const selectSnackBarOpen = createSelector([selectDomain], (globalState: IGlobal) => globalState.snackbar.open);
