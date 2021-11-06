import { AlertColor } from '@mui/material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IGlobal {
  snackbar: {
    open: boolean;
    queue: ISnackBar[];
  };
}

export interface ISnackBar {
  message?: string;
  severity?: AlertColor;
}

export const defaultSnackbar: ISnackBar = {
  message: undefined,
  severity: undefined,
};

export const initialState: IGlobal = {
  snackbar: {
    open: false,
    queue: [],
  },
};

const globalSlice = createSlice({
  name: 'global',
  initialState: initialState,
  reducers: {
    /** Internal action to toggle the open snackbar */
    closeSnackBar(state) {
      return {
        ...state,
        snackbar: {
          ...state.snackbar,
          open: false,
        },
      };
    },
    /** Internal action to remove the completed snackbar from the queue */
    popSnackBar(state) {
      return {
        ...state,
        snackbar: {
          open: state.snackbar.queue.slice(1, state.snackbar.queue.length).length ? true : false,
          queue: state.snackbar.queue.slice(1, state.snackbar.queue.length),
        },
      };
    },
    /**
     * External action. Call this to set a snackbar. This supports a Queue that can be called multiple times
     */
    setSnackBar(state, action: PayloadAction<ISnackBar>) {
      return {
        ...state,
        snackbar: {
          open: true,
          queue: [...state.snackbar.queue, action.payload],
        },
      };
    },
  },
});

const { actions } = globalSlice;

export const { reducer: globalReducer, name: globalSliceKey } = globalSlice;
export const globalActions = {
  ...actions,
};
