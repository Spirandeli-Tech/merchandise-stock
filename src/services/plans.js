import { db } from 'helpers/Firebase';
import { collection, getDocs, addDoc, updateDoc, doc as document, deleteDoc } from 'firebase/firestore';

export const getAllPlans = async () => {
  const allPlans = await getDocs(collection(db, 'plans')).then(
    (querySnapshot) => {
      const plans = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const response = plans.filter((plan) => !plan.custom)
      return response;
    }
  );
  return allPlans;
};

export const addPlan = async (response) => {
  try {
    await addDoc(collection(db, 'plans'), response);
  } catch (error) {
    alert(error);
  }
};

export const updatePlan = async (id, response) => {
  try {
    await updateDoc(document(db, 'plans', id), response);
  } catch (error) {
    alert(error);
  }
};

export const deleteAgent = async (id, response) => {
  try {
    await deleteDoc(document(db, 'users', id), response);
  } catch (error) {
    alert(error);
  }
};
