import { Firestore, doc, updateDoc, collection } from 'firebase/firestore';

export const updateEvent = (firestore: Firestore, id: string, fields: { [key: string]: any }) => {
  updateDoc(doc(collection(firestore, 'events'), `/${id}`), {
    ...fields,
  });
};
