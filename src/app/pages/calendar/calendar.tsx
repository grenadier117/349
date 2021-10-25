import { FC, useState } from 'react';
import { Calendar, dateFnsLocalizer, Event } from 'react-big-calendar';
import withDragAndDrop, { withDragAndDropProps } from 'react-big-calendar/lib/addons/dragAndDrop';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import addHours from 'date-fns/addHours';
import startOfHour from 'date-fns/startOfHour';
import _ from 'lodash';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectEvents } from 'app/events/events.selectors';
import { eventsActions } from 'app/events/events.redux';

export const PetCalendar: FC = () => {
  const events = useSelector(selectEvents);
  const dispatch = useDispatch();

  const updateExistingEvent = data => {
    const { start, end, event } = data;
    const index = events.map(item => item.id).indexOf(event.id);

    const _evnts = _.cloneDeep(events);
    _evnts[index] = {
      ...data.event,
      start: start,
      end: end,
    };
    // TODO: Update firebase instead of dispatching to redux
    dispatch(eventsActions.setEvent({ events: _evnts }));
  };

  const onEventResize: withDragAndDropProps['onEventResize'] = data => {
    updateExistingEvent(data);
  };

  const onEventDrop: withDragAndDropProps['onEventDrop'] = data => {
    updateExistingEvent(data);
  };

  return (
    <div style={{ backgroundColor: 'white', padding: '20px' }}>
      <ViewCalendar
        defaultView="month"
        events={events}
        views={['month', 'week', 'day']}
        localizer={localizer}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        resizable
        style={{ height: 'calc(100vh - 105px)' }}
      />
    </div>
  );
};

const locales = {
  'en-US': enUS,
};
const endOfHour = (date: Date): Date => addHours(startOfHour(date), 1);
const now = new Date();
const start = endOfHour(now);
const end = addHours(start, 2);
// The types here are `object`. Strongly consider making them better as removing `locales` caused a fatal error
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const ViewCalendar = withDragAndDrop(Calendar);
