import { db } from 'helpers/Firebase';
import { doc, setDoc } from 'firebase/firestore';

export const addCompanie = async (response, user) => {
  try {
    await setDoc(doc(db, 'users', user.uid), { ...response, uid: user.uid });
  } catch (error) {
    alert(error);
  }
};
