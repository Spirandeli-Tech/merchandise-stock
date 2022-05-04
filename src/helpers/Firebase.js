import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'

import { firebaseConfig } from 'constants/defaultValues';

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp); // For Authentication
const db = getFirestore(firebaseApp); // For Using Database

const database = getDatabase(firebaseApp);
const storage = getStorage();



export { auth, database, db, storage };
