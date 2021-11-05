import React from 'react';
import { deleteEvent } from 'app/helpers/firebaseHelpers';
import { FirebaseContext } from 'app/app';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import moment from 'moment';
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import { globalActions } from 'app/global/global.redux';

const useEventStyles = makeStyles({
  rowTitle: {
    textAlign: 'end',
  },
});

export const ViewEvent = ({ event, onClose }) => {
  const { firestore } = React.useContext(FirebaseContext);
  const dispatch = useDispatch();
  const classes = useEventStyles();
  const onDelete = () => {
    deleteEvent(firestore, event.id)
      .then(() => {
        dispatch(
          globalActions.setSnackBar({
            message: 'Pet date deleted',
            severity: 'error',
          }),
        );
        onClose();
      })
      .catch(error => {
        console.error(error);
      });
  };
  return (
    <React.Fragment>
      {event && (
        <Dialog open={!!event} onClose={onClose}>
          <DialogTitle>{event.title}</DialogTitle>
          <DialogContent>
            <table cellSpacing={12}>
              <tbody>
                <tr>
                  <td className={classes.rowTitle}>Start Date:</td>
                  <td>{`${moment(event.start).format('MM/DD/YYYY @ hh:mm A')}`}</td>
                </tr>
                <tr>
                  <td className={classes.rowTitle}>End Date:</td>
                  <td>{`${moment(event.end).format('MM/DD/YYYY @ hh:mm A')}`}</td>
                </tr>
              </tbody>
            </table>
            <DialogActions>
              <Button onClick={onDelete}>Delete</Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      )}
    </React.Fragment>
  );
};
