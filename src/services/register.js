import { auth } from 'helpers/Firebase';
import {
  createUserWithEmailAndPassword,
} from 'firebase/auth';

export const registerWithEmailPasswordAsync = async (email, password) =>
// eslint-disable-next-line no-return-await
await createUserWithEmailAndPassword(auth, email, password)
  .then((user) => user)
  .catch((error) => error);