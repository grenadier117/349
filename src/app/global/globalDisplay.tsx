import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer } from 'utils/redux-injectors';
import { globalSliceKey, globalReducer, globalActions } from './global.redux';
import { SnackBar } from 'app/components/snackbar';
import { selectSnackBar, selectSnackBarOpen } from './global.selectors';

export const GlobalDisplay = props => {
  useInjectReducer({ key: globalSliceKey, reducer: globalReducer });
  const dispatch = useDispatch();
  const snackbar = useSelector(selectSnackBar);
  const open = useSelector(selectSnackBarOpen);

  const onSnackBarClose = () => {
    dispatch(globalActions.closeSnackBar());
    let interval;
    if (open) {
      interval = setTimeout(() => {
        dispatch(globalActions.popSnackBar());
      }, 500);
    }
    return () => clearTimeout(interval);
  };

  return (
    <React.Fragment>
      {props.children}
      <SnackBar
        open={open ?? false}
        message={snackbar?.message ?? ''}
        severity={snackbar.severity}
        handleClose={onSnackBarClose}
      />
    </React.Fragment>
  );
};
