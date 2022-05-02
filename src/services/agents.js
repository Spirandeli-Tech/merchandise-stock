import { db } from 'helpers/Firebase';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc as document,
} from 'firebase/firestore';

export const getAllAgents = async () => {
  const allUsers = await getDocs(collection(db, 'users')).then(
    (querySnapshot) => {
      let documents = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      documents = documents.filter((value) => value.role === 'agent');
      return documents;
    }
  );
  return allUsers;
};

export const addAgent = async (response) => {
  try {
    await addDoc(collection(db, 'users'), response);
  } catch (error) {
    alert(error);
  }
};

export const updateAgent = async (id, response) => {
  try {
    await updateDoc(document(db, 'users', id), response);
  } catch (error) {
    alert(error);
  }
};
