import { View, Text,Image } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import MarkFav from '../MarkFav';

const CourseInfo = ({course}) => {
  return (
    <View>
      <Image source={{uri:course.imageUrl}}
      style={{
        width:'100%',
        height:400,
        objectFit:'cover'
      }}
      />
      <View style={{
        padding:20
      }}>
        <View>
         <Text style={{
            fontFamily:'outfit-bold',
            fontSize:27
         }}>{course.name}</Text>
        </View>
        <View style={{
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center'
        }}>
            <Text style={{
                fontSize:16,
                fontFamily:'outfit-medium'
            }}>Add to favourite</Text>
            <MarkFav course={course}/>
        </View>
      </View>
    </View>
  )
}

export default CourseInfo