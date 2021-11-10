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
import { addEvent, deleteEvent, updateEvent } from 'app/helpers/firebaseHelpers';
import { FirebaseContext } from 'app/app';
import { AddEvent } from './addEvent';
import { IFirebaseEvent } from 'app/models/firebaseEvent';

export const PetCalendar: FC = () => {
  const { firestore } = React.useContext(FirebaseContext);
  const events = useSelector(selectEvents);
  const [event, setEvent] = React.useState<any>(null);
  const [addEventData, setAddEventData] = React.useState<any>(null);

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

  const onSelect = event => {
    setEvent(event);
  };

  const onAddEvent = (eventDetails: IFirebaseEvent): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
      addEvent(firestore, eventDetails)
        .then(() => {
          setAddEventData(null);
          resolve(true);
        })
        .catch(error => {
          console.log('error', error);
          reject(error);
        });
    });
  };

  const onCancelAddEvent = () => {
    setAddEventData(null);
    setEvent(null);
  };

  const onSelectSlot = slotInfo => {
    if (slotInfo.action === 'doubleClick' || slotInfo.action === 'select') setAddEventData(slotInfo);
  };

  const onDelete = () => {
    return new Promise<any>((resolve, reject) => {
      deleteEvent(firestore, event.id)
        .then(() => {
          setEvent(null);
          resolve(true);
        })
        .catch(error => {
          reject(error);
          console.error('error', error);
        });
    });
  };

  const onUpdate = (id: string, eventDetails: IFirebaseEvent): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
      updateEvent(firestore, id, {
        start: eventDetails.start,
        end: eventDetails.end,
        title: eventDetails.title,
        description: eventDetails.description,
      })
        .then(() => {
          setEvent(null);
          resolve(true);
        })
        .catch(error => {
          console.log('error', error);
          reject(error);
        });
    });
  };

  return (
    <div style={{ backgroundColor: 'white', padding: '20px' }}>
      <ViewCalendar
        selectable
        defaultView="month"
        events={events}
        views={['month', 'week', 'day']}
        localizer={localizer}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        resizable
        style={{ height: 'calc(100vh - 105px)' }}
        onSelectEvent={onSelect}
        onSelectSlot={onSelectSlot}
      />
      <AddEvent
        addEvent={!!addEventData}
        editEvent={!!event}
        open={!!addEventData || event}
        slotInfo={addEventData ? addEventData : event}
        onCancel={onCancelAddEvent}
        onAdd={onAddEvent}
        onDelete={onDelete}
        onUpdate={onUpdate}
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
