import { db } from 'helpers/Firebase';
import { collection, getDocs } from 'firebase/firestore';

const { useQuery } = require('react-query');

export const FetchAllUsers = () => useQuery(
  ['fetch-subscribers'],
  () => {
    const allUsers = getDocs(collection(db, 'users')).then(
      (querySnapshot) => {
        const documents = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        const users = documents.filter((dto) => (dto.subscription))
        const owners = documents.filter(({ role }) => role === 'business');
        const standardUser = documents.filter((dto) => (!dto.type || dto.type !== 'business'));
        return {
          subscribers: users,
          users: standardUser,
          business: owners,
        }
      }
    );
    return allUsers;
  },
  {
    select: (data) => (data),
  }
);


