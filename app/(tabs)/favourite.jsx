import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { getAuth } from "firebase/auth";

const Favourite = () => {
  const [favoriteCourses, setFavoriteCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const userEmail = auth.currentUser?.email;

  useEffect(() => {
    fetchFavoriteCourses();
  }, []);

  const fetchFavoriteCourses = async () => {
    setLoading(true);
    try {
      const coursesRef = collection(db, "courses");
      const q = query(coursesRef, where("favourites", "array-contains", userEmail));
      const querySnapshot = await getDocs(q);
      
      const courses = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFavoriteCourses(courses);
    } catch (error) {
      console.error("Error fetching favorite courses:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="blue" style={{ marginTop: 20 }} />;
  }

  return (
    <View style={{
      padding:20,
      flexDirection:'column'
      }}>
        <Text
          style={{
            fontFamily: "outfit-medium",
            fontSize: 30,
          }}
        >
          My Favourite
        </Text>
    {loading ? (
           <Text>Loading...</Text>
         ) : favoriteCourses.length === 0 ? (
           <Text>No favourite found</Text>
         ) : (
        <FlatList
          data={favoriteCourses}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={styles.courseBox}>
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
              <Text style={styles.courseTitle}>{item.name}</Text>
              <Text style={styles.courseCategory}>{item.category}</Text>
              <Text style={styles.courseDuration}>{item.duration}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  courseBox: {
    flex: 1,
    margin: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  courseCategory: {
    fontSize: 14,
    color: "gray",
  },
  courseDuration: {
    fontSize: 14,
    marginTop: 5,
    color: "#555",
  },
});

export default Favourite;