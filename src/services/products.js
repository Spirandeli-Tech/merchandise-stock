import { db } from 'helpers/Firebase';
import { collection, getDocs, addDoc, updateDoc, doc as document, deleteDoc } from 'firebase/firestore';

export const getAllProducts = async () => {
  const allProducts = await getDocs(collection(db, 'products')).then(
    (querySnapshot) => {
      const prodcuts = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      return prodcuts;
    }
  );
  return allProducts;
};

export const addProduct = async (response) => {
  try {
    await addDoc(collection(db, 'products'), response);
  } catch (error) {
    alert(error);
  }
};

export const updateProduct = async (id, response) => {
  try {
    await updateDoc(document(db, 'products', id), response);
  } catch (error) {
    alert(error);
  }
};

export const deleteProduct = async (id, response) => {
  try {
    await deleteDoc(document(db, 'products', id), response);
  } catch (error) {
    alert(error);
  }
};
