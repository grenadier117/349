import React, { FC } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import withDragAndDrop, { withDragAndDropProps } from 'react-big-calendar/lib/addons/dragAndDrop';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useSelector } from 'react-redux';
import { selectEvents } from 'app/events/events.selectors';
import { updateEvent } from 'app/helpers/firebaseHelpers';
import { FirebaseContext } from 'app/app';

export const PetCalendar: FC = () => {
  const { firestore } = React.useContext(FirebaseContext);
  const events = useSelector(selectEvents);

  const updateExistingEvent = data => {
    const { start, end, event } = data;
    updateEvent(firestore, event.id, {
      start: (start as Date).toISOString(),
      end: (end as Date).toISOString(),
      title: event.title,
    });
  };

  const onEventResize: withDragAndDropProps['onEventResize'] = data => {
    updateExistingEvent(data);
  };

  const onEventDrop: withDragAndDropProps['onEventDrop'] = data => {
    updateExistingEvent(data);
  };

  const onSelect = () => {
    // TODO: OPEN A MATERIAL UI DIALOG HERE WITH EVENT DETAILS
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
        onSelectEvent={onSelect}
      />
    </div>
  );
};

const locales = {
  'en-US': enUS,
};

// The types here are `object`. Strongly consider making them better as removing `locales` caused a fatal error
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const ViewCalendar = withDragAndDrop(Calendar);
