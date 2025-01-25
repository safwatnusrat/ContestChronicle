import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import CourseInfo from '../../components/CourseDetails/CourseInfo';
import CourseSubinfo from '../../components/CourseDetails/CourseSubinfo';
import AboutCourse from '../../components/CourseDetails/AboutCourse';
import InstructorInfor from '../../components/CourseDetails/InstructorInfor';

const index = () => {
    const course=useLocalSearchParams();
  return (
    <View>
        <ScrollView>
        <CourseInfo course={course}/>
        <CourseSubinfo course ={course}/>
        <AboutCourse course ={course}/>
        <InstructorInfor course={course}/>
        <View style={{
            height:70
        }}></View>
        </ScrollView>
        <View style={{
            position:'absolute',
            width:'100%',
            bottom:0
        }}>
       <TouchableOpacity style={{
        padding:15,
        backgroundColor:'#e2bc4d',
       }}>
        <Text style={{
            textAlign:'center',
            fontFamily:'outfit-medium',
            fontSize:20
        }}>Enroll the Course</Text>
        </TouchableOpacity>
       </View>
    </View>
  )
}

export default index