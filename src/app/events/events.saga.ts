import { takeLatest, put, call } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { trackPromise } from 'react-promise-tracker';
import { getFirebaseEvents } from 'app/services/services';
import { eventsActions } from './events.redux';

const TrackWrapper = (fn, ...args) => trackPromise(fn(...args), 'facility');

export function* requestAllEvents(action: PayloadAction) {
  try {
    const response = yield call(TrackWrapper, getFirebaseEvents);
    console.log(response);
  } catch (error) {
    // TODO: Handle errors here
    console.log('ERROR', error);
  }
}

export function* facilitySaga() {
  yield takeLatest(eventsActions.getAllEvents.type, requestAllEvents);
}
