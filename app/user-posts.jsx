import { View, Text, FlatList,Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";
import { getAuth } from "firebase/auth";
import CourseListItem from "./../components/Home/CourseListItem";
import { Pressable,StyleSheet } from "react-native";

const userposts = () => {
  const [userCourse, setUserCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    const GetUserCourse = async () => {
      try {
        const q = query(
          collection(db, "courses"),
          where("instructor.email", "==", currentUser.email)
        );
        const querySnapshot = await getDocs(q);
        const posts = [];
        querySnapshot.forEach((doc) => {
          posts.push({ ...doc.data(), id: doc.id });
        });
        setUserCourses(posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    GetUserCourse();
  }, [currentUser]);
//   const deleteCourse = async (docId) => {
//       await deleteDoc(doc(db, "courses", docId)); 
//       setUserCourses();
//   };

  const onDeleteCourse = (docId) => {
    Alert.alert(
      "Delete Course",
      "Do you want to delete this course?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress:async () => {
            await deleteDoc(doc(db, "courses", docId)); 
            setUserCourses((prevCourses) =>
                prevCourses.filter((course) => course.id !== docId)
              );
          },
        },
      ]);
  };

  const onUpdateCourse=async(docId)=>{

  }
  

  return (
    <View style={{ padding: 20 }}>
      <Text
        style={{
          fontFamily: "outfit-medium",
          fontSize: 30,
        }}
      >
        My Courses
      </Text>

      {loading ? (
        <Text>Loading...</Text>
      ) : userCourse.length === 0 ? (
        <Text>No courses found</Text>
      ) : (
        <FlatList
          data={userCourse}
          numColumns={2}
          renderItem={({ item }) => 
            <View>
          <CourseListItem course={item} />
          
            <View style={{
                flexDirection:'column'
            }}>
        
          <Pressable style={styles.deleteButton} onPress={()=>onUpdateCourse(item?.id)}>
          <Text style={{
                fontFamily:'outfit',
                textAlign:'center',
                fontSize:16
            }}>
           Update
          </Text>
          </Pressable>
          <Pressable style={styles.deleteButton} onPress={()=>onDeleteCourse(item?.id)}>
            <Text style={{
                fontFamily:'outfit',
                textAlign:'center',
                fontSize:16
            }}>
            Delete
          </Text>
          </Pressable>
            </View>
          </View>}
          
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};
const styles=StyleSheet.create({
    deleteButton:{
        backgroundColor:'#e3d098',
        padding:5,
        borderRadius:8,
        marginTop:5,
        marginRight:10


    }
})
export default userposts;
