import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { getAuth } from 'firebase/auth'
import CourseListItem from './../components/Home/CourseListItem'

const userposts = () => {
    const[userPosts,setUserPosts]=useState([]);
    const auth = getAuth();
    const currentUser = auth.currentUser;
    useEffect(()=>{
        const GetUserPost=async()=>{
            const q=query(collection(db,'courses'),where('email','==',currentUser.email));
            const querySnapshot=await getDocs(q);
            const posts = [];
            querySnapshot.forEach((doc)=>{
                posts.push(doc.data());
            })
            setUserPosts(posts);
        }
        GetUserPost();
    },[currentUser])
    
  return (
    <View style={{
        padding:20
    }}>
      <Text style={{
        fontFamily:'outfit-medium',
        fontSize:30
      }}>user-posts</Text>
      <FlatList
      data={userPosts}
      renderItem={({item,index})=>(
        <CourseListItem course={item} key={index}/>
      )}/>
    </View>
  )
}

export default userposts