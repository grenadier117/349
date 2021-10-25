import { FirebaseContext } from 'app/app';
import React from 'react';

export const Firebase = props => {
  const { firebaseApp } = React.useContext(FirebaseContext);

  React.useEffect(() => {
    console.info('FIREBASE', firebaseApp);
    // TODO: Load events from firebase here
  }, []);

  return props.children;
};
