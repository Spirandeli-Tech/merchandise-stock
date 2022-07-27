import { db, auth } from 'helpers/Firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { setCurrentUser } from 'helpers/Utils';

export const registerWithEmailPasswordAsync = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password)
    .then((user) => user)
    .catch((error) => error);

const updateAuthUser = (userCredential, formData) =>
  updateProfile(userCredential, {
    displayName: `${formData.firstName} ${formData.lastName}`,
  });

const createUserDocument = async (user, response) => {
  try {
    await setDoc(doc(db, 'users', user.uid), { ...response, uid: user.uid });
  } catch (error) {
    throw 'Not able to register user on Firestore';
  }
};

export const fetchRegister = async (body) => {
  try {
    const { user } = await registerWithEmailPasswordAsync(
      body.email,
      body.password
    );
    await updateAuthUser(user, body);
    const currentUserBody = { ...body, uid: user.uid };
    await createUserDocument(user, currentUserBody);
    setCurrentUser(currentUserBody);
    return { error: false };
  } catch (error) {
    return { error: true, errorMessage: error };
  }
};
