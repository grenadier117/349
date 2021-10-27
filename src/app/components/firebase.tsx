import { FirebaseContext } from 'app/app';
import React from 'react';
import { onSnapshot, collection } from 'firebase/firestore';
import { useInjectReducer } from 'utils/redux-injectors';
import { eventsActions, eventsReducer, eventsSliceKey, IEvent } from 'app/events/events.redux';
import { useDispatch } from 'react-redux';

export const Firebase = props => {
  useInjectReducer({ key: eventsSliceKey, reducer: eventsReducer });
  const dispatch = useDispatch();
  const { firestore } = React.useContext(FirebaseContext);

  React.useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, 'events'), querySnapshot => {
      const events: IEvent[] = [];
      querySnapshot.forEach(doc => {
        const data = doc.data();
        events.push({ start: data.start, end: data.end, title: data.title, id: doc.id });
      });
      dispatch(
        eventsActions.setEvent({
          events: events,
        }),
      );
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return props.children;
};
