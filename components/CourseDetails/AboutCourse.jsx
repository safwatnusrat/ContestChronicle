import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'

const AboutCourse = ({course}) => {
    const [readMore,setReadMore]=useState(true);
  return (
    <View style={{
        padding:20
    }}>
      <Text style={{
        fontFamily:'outfit-medium',
        fontSize:20
      }}>About {course.name}</Text>
      <Text numberOfLines={readMore?3:20}style={{
        fontFamily:'outfit-regular',
        fontSize:14
      }}>
        {course.about}
      </Text>
      {readMore && <Pressable onPress={()=>setReadMore(false)}>
       <Text style={{
        color:'#1e90ff',
        fontSize:14,
        fontFamily:'outfit-medium'
      }}>Read More</Text>
      </Pressable>}
    </View>
  )
}

export default AboutCourse