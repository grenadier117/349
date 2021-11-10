import { IFirebaseEvent } from 'app/models/firebaseEvent';
import { Firestore, doc, updateDoc, setDoc, collection, deleteDoc } from 'firebase/firestore';

/**
 * Update an event that already exists in firebase
 * @param firestore firestire instance
 * @param id Firebase document ID
 * @param fields fields that need to be updated
 */
export const updateEvent = (firestore: Firestore, id: string, fields: { [key: string]: any }) => {
  return updateDoc(doc(collection(firestore, 'events'), `/${id}`), {
    ...fields,
  });
};

/**
 * Add a new event to firebase
 * @param firestore firestore instance
 * @param fields new event to add
 */
export const addEvent = (firestore: Firestore, fields: IFirebaseEvent) => {
  return setDoc(doc(firestore, 'events', makeDocHash(20)), fields);
};

export const deleteEvent = (firestore: Firestore, id: string) => {
  return deleteDoc(doc(collection(firestore, 'events'), `/${id}`));
};

const makeDocHash = len => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < len; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
