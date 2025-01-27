import { View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {doc,updateDoc,arrayUnion,arrayRemove,collection,query,where,getDocs} from "firebase/firestore";
import { db } from "../lib/firebase";
import { getAuth } from "firebase/auth";

const MarkFav = ({ course }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const auth = getAuth();
  const userEmail = auth.currentUser?.email;

  useEffect(() => {
    checkFavoriteStatus();
  }, []);

  const checkFavoriteStatus = async () => {
    setIsLoading(true);
    try {
      const coursesRef = collection(db, "courses");
      const q = query(coursesRef, where("id", "==", course.id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const courseDoc = querySnapshot.docs[0];
        const favorites = courseDoc.data().favourites || [];
        setIsFavorite(favorites.includes(userEmail));
      }
    } catch (error) {
      console.error("Error checking favorite status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavorite = async () => {
    setIsLoading(true);
    try {
      const coursesRef = collection(db, "courses");
      const q = query(coursesRef, where("id", "==", course.id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const courseDoc = querySnapshot.docs[0];
        const courseRef = doc(db, "courses", courseDoc.id);
        const courseData = courseDoc.data();

        if (!courseData.favourites) {
          await updateDoc(courseRef, {
            favourites: [],
          });
        }

        if (isFavorite) {
          await updateDoc(courseRef, {
            favourites: arrayRemove(userEmail),
          });
        } else {
          await updateDoc(courseRef, {
            favourites: arrayUnion(userEmail),
          });
        }

        setIsFavorite(!isFavorite);
      }
    } catch (error) {
      console.error("Error updating favorite:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View>
      <Pressable onPress={toggleFavorite} disabled={isLoading}>
        <Ionicons
          name={
            isLoading
              ? "hourglass-outline"
              : isFavorite
              ? "heart"
              : "heart-outline"
          }
          size={24}
          color={isLoading ? "gray" : isFavorite ? "red" : "black"}
        />
      </Pressable>
    </View>
  );
};

export default MarkFav;
