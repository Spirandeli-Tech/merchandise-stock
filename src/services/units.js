import { db } from 'helpers/Firebase';
import {
  collection,
  getDocs,
  updateDoc,
  doc as document,
  deleteDoc,
  setDoc,
} from 'firebase/firestore';
import generateID from './ids';

export const getAllUnits = async () => {
  const allUnits = await getDocs(collection(db, 'units')).then(
    (querySnapshot) => {
      const units = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      return units;
    }
  );
  return allUnits;
};

export const addUnit = async (response) => {
  const id = generateID();

  try {
    await setDoc(document(db, 'units', id), { ...response, uid: id });
  } catch (error) {
    alert(error);
  }
};

export const deleteUnit = async (id, response) => {
  try {
    await deleteDoc(document(db, 'units', id), response);
  } catch (error) {
    alert(error);
  }
};

export const updateUnit = async (id, response) => {
  try {
    await updateDoc(document(db, 'units', id), response);
  } catch (error) {
    alert(error);
  }
};
