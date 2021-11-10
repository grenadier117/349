import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import DateTimePicker from '@mui/lab/DateTimePicker';
import React from 'react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import { IFirebaseEvent } from 'app/models/firebaseEvent';
import { useDispatch } from 'react-redux';
import { globalActions } from 'app/global/global.redux';

const useStyles = makeStyles({
  title: {
    textAlign: 'start',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  scrollbar: {
    '&::-webkit-scrollbar': {
      width: '0.5em',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '10px',
      scrollPadding: '4px',
      height: '10%',
      border: '5px solid rgba(255,255,255,0)',
      boxShadow: 'inset -1px -1px 0px rgba(0, 0, 0, 0.05), inset 1px 1px 0px rgba(0, 0, 0, 0.05)',
      backgroundColor: '#888888',
    },
  },
});

export const AddEvent = ({
  open,
  slotInfo,
  onCancel,
  onAdd,
  onUpdate,
  onDelete,
  addEvent,
  editEvent,
}: {
  open: boolean;
  slotInfo: { [key: string]: any };
  onCancel: () => void;
  onAdd?: (eventDetails: IFirebaseEvent) => Promise<any> | void;
  onUpdate?: (id: string, eventDetails: IFirebaseEvent) => Promise<any> | void;
  onDelete?: (id: any) => Promise<any> | void;
  addEvent?: boolean;
  editEvent?: boolean;
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [_startDate, _setStartDate] = React.useState<any>(slotInfo?.start);
  const [_endDate, _setEndDate] = React.useState<any>(slotInfo?.end);
  const [_title, _setTitle] = React.useState<string | undefined>(slotInfo?.title);
  const [_description, _setDescription] = React.useState<string | undefined>(slotInfo?.description);
  const [errors, setErrors] = React.useState<{ [key: string]: boolean }>({});

  React.useEffect(() => {
    console.info('@JAKE - event', slotInfo);
    _setStartDate(slotInfo?.start);
    _setEndDate(slotInfo?.end);
    _setTitle(slotInfo?.title);
    _setDescription(slotInfo?.description);
  }, [slotInfo]);

  const onTitleChange = event => {
    _setTitle(event.target.value);
    setErrors(prev => ({
      ...prev,
      title: !event.target.value,
    }));
  };

  const onDescriptionChange = event => {
    _setDescription(event.target.value);
  };

  const onStartDateChange = objectKey => event => {
    setErrors(prev => ({
      ...prev,
      [objectKey]: false,
    }));
    _setStartDate(moment(event));
  };

  const onEndDateChange = objectKey => event => {
    setErrors(prev => ({
      ...prev,
      [objectKey]: false,
    }));
    _setEndDate(moment(event));
  };

  const _onCancel = () => {
    onCancel();
    clearValues();
  };

  /**
   * Add a new event
   * @returns Promise of success or failure
   */
  const _onAdd = () => {
    if (validateForm()) {
      setErrors({});
    } else return;

    onAdd?.({
      start: moment(_startDate).format('YYYY-MM-DDTHH:mm:ss.SSSz'),
      end: moment(_endDate).format('YYYY-MM-DDTHH:mm:ss.SSSz'),
      title: _title ?? '',
      description: _description ?? '',
    })
      ?.then(() => {
        dispatch(
          globalActions.setSnackBar({
            message: 'Pet date created!',
            severity: 'info',
          }),
        );
        clearValues();
      })
      .catch(error => {
        dispatch(
          globalActions.setSnackBar({
            message: 'Error creating event',
            severity: 'error',
          }),
        );
        console.error('Error adding event', error);
      });
  };

  /**
   * Delete an existing event
   */
  const _onDelete = () => {
    onDelete?.(slotInfo.id)
      ?.then(() => {
        dispatch(
          globalActions.setSnackBar({
            message: 'Pet date deleted',
            severity: 'error',
          }),
        );
      })
      .catch(error => {
        console.error(error);
      });
  };

  /**
   * Update an existing event
   * @returns Promise of success or failure
   */
  const _onUpdate = () => {
    if (validateForm()) {
      setErrors({});
    } else return;

    onUpdate?.(slotInfo.id, {
      start: moment(_startDate).format('YYYY-MM-DDTHH:mm:ss.SSSz'),
      end: moment(_endDate).format('YYYY-MM-DDTHH:mm:ss.SSSz'),
      title: _title ?? '',
      description: _description ?? '',
    })
      ?.then(() => {
        dispatch(
          globalActions.setSnackBar({
            message: 'Pet date updated!',
            severity: 'info',
          }),
        );
        clearValues();
      })
      .catch(error => {
        dispatch(
          globalActions.setSnackBar({
            message: 'Error creating event',
            severity: 'error',
          }),
        );
        console.error('Error adding event', error);
      });
  };

  // TODO: Implement React Hook Form for validation when time permits
  const validateForm = (): boolean => {
    if (Object.values(errors).indexOf(true) !== -1 || !_title) {
      if (!_title) {
        setErrors(prev => ({
          ...prev,
          title: true,
        }));
      }
      return false;
    } else if (_endDate < _startDate) {
      dispatch(
        globalActions.setSnackBar({
          message: 'End date cannot be less than start date',
          severity: 'error',
        }),
      );
      return false;
    }
    return true;
  };

  const onError = objectKey => event => {
    if (event === 'invalidDate') {
      setErrors(prev => ({
        ...prev,
        [objectKey]: true,
      }));
    }
  };

  const clearValues = () => {
    _setStartDate(undefined);
    _setEndDate(undefined);
    _setTitle(undefined);
    _setDescription(undefined);
    setErrors({});
  };

  return (
    <Dialog maxWidth="xs" open={open}>
      <DialogTitle>{addEvent ? 'Add Event' : 'Edit Event'}</DialogTitle>
      <DialogContent style={{ width: '250px' }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                className={classes.fullWidth}
                variant="standard"
                error={errors.title}
                helperText={errors.title && 'Title required'}
                value={_title}
                onChange={onTitleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputProps={{
                  className: classes.scrollbar,
                }}
                label="Description"
                className={classes.fullWidth}
                variant="standard"
                multiline
                maxRows={4}
                value={_description}
                onChange={onDescriptionChange}
              />
            </Grid>
            <Grid item xs={12}>
              <DateTimePicker
                label="Start Date"
                value={_startDate}
                onError={onError('start')}
                onChange={onStartDateChange('start')}
                renderInput={params => (
                  <TextField
                    className={classes.fullWidth}
                    variant="standard"
                    error={errors.start}
                    helperText={errors.start && 'Start date required'}
                    {...params}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <DateTimePicker
                label="End Date"
                value={_endDate}
                onError={onError('end')}
                onChange={onEndDateChange('end')}
                renderInput={params => (
                  <TextField
                    className={classes.fullWidth}
                    variant="standard"
                    error={errors.end}
                    helperText={errors.start && 'End date required'}
                    {...params}
                  />
                )}
              />
            </Grid>
          </Grid>
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button style={{ color: 'white' }} onClick={_onCancel}>
          Cancel
        </Button>
        {addEvent && (
          <Button disabled={Object.values(errors).indexOf(true) !== -1} style={{ color: 'white' }} onClick={_onAdd}>
            Add
          </Button>
        )}
        {editEvent && (
          <Button disabled={Object.values(errors).indexOf(true) !== -1} style={{ color: 'white' }} onClick={_onUpdate}>
            Update
          </Button>
        )}
        {editEvent && (
          <Button disabled={Object.values(errors).indexOf(true) !== -1} style={{ color: 'salmon' }} onClick={_onDelete}>
            Delete
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
