import { db } from 'helpers/Firebase';
import { collection, getDocs } from 'firebase/firestore';

export const getAllPayments = async () => {
  const allPlans = await getDocs(collection(db, 'payments')).then(
    (querySnapshot) => {
      const payments = querySnapshot.docs.map((doc) => ({...doc.data()}));
      return payments;
    }
  );
  return allPlans;
};