import { View, Text,FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Category from './Category'
import { collection,getDocs, query, where } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import CourseListItem from './CourseListItem'

const CourseListByCategory = () => {
  
  useEffect(()=>{
    GetCourseList('Machine Learning');
  },[])
  

  const [courseList,setCourseList]=useState([]);
  const [loader,setloader]=useState(false);
  const GetCourseList=async(category)=>{
    setloader(true);
    setCourseList([]);
    const q=query(collection(db,'courses'),where('category','==',category));
    const querySnapshot= await getDocs(q);

    querySnapshot.forEach(doc=>{
      //console.log(doc.data());
      setCourseList(courseList=>[...courseList,doc.data()]);
    })
    setloader(false);
  }

  return (
    <View>
      <Category category={(value)=>GetCourseList(value)}/>
        <FlatList
        data={courseList}
        style={{marginTop:10}}
        refreshing={loader}
        onRefresh={()=>GetCourseList('Machine Learning')}
        horizontal={true}
        renderItem={({item,index})=>(
          <CourseListItem course ={item}/>
        )}/>
    </View>
  )
}

export default CourseListByCategory