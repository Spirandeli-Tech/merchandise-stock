import { db } from 'helpers/Firebase';
import { collection, getDocs, updateDoc, doc as document } from 'firebase/firestore';

export const getAllUsers = async () => {
  const allUsers = await getDocs(collection(db, 'users')).then(
    (querySnapshot) => {
      const documents = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
      return documents;
    }
  );
  return allUsers;
};

export const getAllCompanies = async () => {
  const allUsers = await getDocs(collection(db, 'users')).then(
    (querySnapshot) => {
      let documents = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
      documents = documents.filter((value) => value.role === 'business');
      const configureData = (el) => {
        const date = el.split('/');
        const newDate = new Date(date[2], date[1] - 1, date[0]);
        return newDate;
      };
      const orderedDocuments = function desc(a, b) {
        return configureData(b?.createdAt) - configureData(a?.createdAt);
      };
      documents.sort(orderedDocuments);
      return documents;
    }
  );
  return allUsers;
};

export const getUserForLogin = async ({ uid }) => {
  const user = await getDocs(collection(db, 'users')).then((querySnapshot) => {
    const userList = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    const rightUser = userList.find((item) => item.uid === uid);
    return rightUser;
  });
  return user;
};

export const updateUser = async(id, response) => {
  try {
    await updateDoc(document(db, 'users', id), response);
  }catch(error){
    alert(error)
  }
}
