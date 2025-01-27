import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

const GetFavList = async (user) => {
  const docRef = doc(db, 'userFavCourse', user?.primaryEmailAddress?.emailAddress);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    await setDoc(docRef, {
      email: user?.primaryEmailAddress?.emailAddress,
      favourites: [],
    });
    return { favourites: [] };  // Return default empty favourites array
  }
};

const updateFav = async (userId, favourites) => {
  const docRef = doc(db, 'userFavCourse', userId);
  try {
    await updateDoc(docRef, { favourites });
  } catch (e) {
    console.error('Error updating favorites:', e);
  }
};

export default {
  GetFavList,
  updateFav,
};
