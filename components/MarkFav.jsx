import { View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import Shared from './../shared/Shared';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const MarkFav = ({ course }) => {
  const [favList, setFavList] = useState([]);
  const db = getFirestore();
  const userId = 'USER_DOCUMENT_ID';  // Replace with actual user document ID

  useEffect(() => {
    GetFav();
  }, []);

  const GetFav = async () => {
    try {
      const userDocRef = doc(db, 'users', userId);
      const userSnap = await getDoc(userDocRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        const favs = await Shared.GetFavList(userData);
        setFavList(favs?.favourites || []);
        console.log(favs);
      } else {
        console.log('No such user document!');
      }
    } catch (error) {
      console.error('Error fetching favorite list:', error);
    }
  };

  const AddToFav = async () => {
    try {
      const updatedFavList = [...favList, course.id];
      await Shared.updateFav(userId, updatedFavList);
      setFavList(updatedFavList);  // Update state to reflect the change
    } catch (error) {
      console.error('Error updating favorite list:', error);
    }
  };

  return (
    <View>
      {favList.includes(course.id) ? (
        <Pressable>
          <Ionicons name="heart" size={24} color="red" />
        </Pressable>
      ) : (
        <Pressable onPress={AddToFav}>
          <Ionicons name="heart-outline" size={24} color="black" />
        </Pressable>
      )}
    </View>
  );
};

export default MarkFav;
