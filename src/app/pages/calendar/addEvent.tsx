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
});

export const AddEvent = ({
  open,
  slotInfo,
  onCancel,
  onAdd,
}: {
  open: boolean;
  slotInfo: { [key: string]: any };
  onCancel: () => void;
  onAdd: (eventDetails: IFirebaseEvent) => Promise<any>;
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [startDate, setStartDate] = React.useState<any>(null);
  const [endDate, setEndDate] = React.useState<any>(null);
  const [title, setTitle] = React.useState<string | null>(null);
  const [errors, setErrors] = React.useState<{ [key: string]: boolean }>({});

  React.useEffect(() => {
    setStartDate(slotInfo?.start);
    setEndDate(slotInfo?.end);
  }, [slotInfo]);

  const onTitleChange = event => {
    setTitle(event.target.value);
    setErrors(prev => ({
      ...prev,
      title: !event.target.value,
    }));
  };

  const onStartDateChange = objectKey => event => {
    setErrors(prev => ({
      ...prev,
      [objectKey]: false,
    }));
    setStartDate(moment(event));
  };

  const onEndDateChange = objectKey => event => {
    setErrors(prev => ({
      ...prev,
      [objectKey]: false,
    }));
    setEndDate(moment(event));
  };

  const _onCancel = () => {
    onCancel();
    clearValues();
  };

  const _onAdd = objectKey => _ => {
    if (validateForm()) {
      setErrors({});
    } else return;

    onAdd({
      start: moment(startDate).format('YYYY-MM-DDTHH:mm:ss.SSSz'),
      end: moment(endDate).format('YYYY-MM-DDTHH:mm:ss.SSSz'),
      title: objectKey ?? '',
    })
      .then(_ => {
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

  // TODO: Implement React Hook Form for validation when time permits
  const validateForm = (): boolean => {
    if (Object.values(errors).indexOf(true) !== -1 || !title) {
      if (!title) {
        setErrors(prev => ({
          ...prev,
          title: true,
        }));
      }
      return false;
    } else if (endDate < startDate) {
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
    setStartDate(null);
    setEndDate(null);
    setTitle(null);
    setErrors({});
  };

  return (
    <Dialog maxWidth="xs" open={open}>
      <DialogTitle>Add Event</DialogTitle>
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
                value={title}
                onChange={onTitleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <DateTimePicker
                label="Start Date"
                value={startDate}
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
                value={endDate}
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
        <Button
          disabled={Object.values(errors).indexOf(true) !== -1}
          style={{ color: 'white' }}
          onClick={_onAdd('title')}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};
