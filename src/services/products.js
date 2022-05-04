import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc as document,
  deleteDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { db, storage } from 'helpers/Firebase';

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

export const uploadImage = async (file) => {
  if (!file) {
    alert('Nenhuma imagem inserida');
  }
  const storageRef = ref(storage, `images/${file.name}`);

  const cloudStorageImageUrl = await uploadBytes(storageRef, file).then(
    async (snapshot) => {
      const imageUrl = await getDownloadURL(snapshot.ref).then((url) => url);
      return imageUrl;
    }
  );
  return cloudStorageImageUrl;
};
