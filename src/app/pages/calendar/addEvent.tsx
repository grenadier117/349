/* eslint-disable prettier/prettier */
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import DateTimePicker from '@mui/lab/DateTimePicker';
import React from 'react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import { IFirebaseEvent } from 'app/models/firebaseEvent';

const useStyles = makeStyles({
  title: {
    textAlign: 'start',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export const AddEvent = (
  {
    open,
    slotInfo,
    onCancel,
    onAdd
  }:{
    open: boolean,
    slotInfo: { [key: string]: any }; 
    onCancel: () => void; 
    onAdd: (eventDetails: IFirebaseEvent) => Promise<any> 
  }) => {
  const classes = useStyles();
  const [startDate, setStartDate] = React.useState<any>(null);
  const [endDate, setEndDate] = React.useState<any>(null);
  const [title, setTitle] = React.useState<string | null>(null);

  React.useEffect(() => {
    setStartDate(slotInfo?.start);
    setEndDate(slotInfo?.end);
  }, [slotInfo]);

  const onTitleChange = event => {
    setTitle(event.target.value);
  };

  const onStartDateChange = event => {
    setStartDate(moment(event))
  }

  const onEndDateChange = event => {
    setEndDate(moment(event))
  }

  const _onCancel= () => {
    onCancel();
    clearValues();
  }

  const _onAdd = () => {
    onAdd({
      start: moment(startDate).format('YYYY-MM-DDTHH:mm:ss.SSSz'),
      end: moment(endDate).format('YYYY-MM-DDTHH:mm:ss.SSSz'),
      title: title ?? '',
    }).then(_ => {
      clearValues();
    }).catch(error => {
      console.error('Error adding event', error);
    });
  }

  const clearValues = () => {
    setStartDate(null);
    setEndDate(null);
    setTitle(null);
  }

  return (
    <Dialog maxWidth="xs" open={open}>
      <DialogTitle>Add Event</DialogTitle>
      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid container spacing={3}>
            <Grid className={classes.title} item xs={4}>
              Title
            </Grid>
            <Grid item xs={8}>
              <TextField value={title} onChange={onTitleChange} />
              {/* Date picker */}
            </Grid>
            <Grid className={classes.title} item xs={4}>
              Start Date
            </Grid>
            <Grid item xs={8}>
              <DateTimePicker
                label="Start Date"
                value={startDate}
                onChange={onStartDateChange}
                renderInput={params => <TextField {...params} />}
              />
            </Grid>
            <Grid className={classes.title} item xs={4}>
              End Date
            </Grid>
            <Grid item xs={8}>
              <DateTimePicker
                label="End Date"
                value={endDate}
                onChange={onEndDateChange}
                renderInput={params => <TextField {...params} />}
              />
            </Grid>
          </Grid>
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button style={{ color: 'white' }} onClick={_onCancel}>
          Cancel
        </Button>
        <Button style={{ color: 'white' }} onClick={_onAdd}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};
