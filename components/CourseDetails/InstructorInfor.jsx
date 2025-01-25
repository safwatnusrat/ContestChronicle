import { View, Text } from 'react-native'
import React from 'react'

const InstructorInfor = ({course}) => {
  return (
    <View style={{
        paddingHorizontal:20,
        // display:'flex',
        flex:1,
        alignItems:'center',
        borderWidth:1,
        borderRadius:10,
        padding:16,
        backgroundColor:'white',
        marginHorizontal:20,
        borderColor:'white'
    }}>
      <Text style={{
        fontFamily:'outfit',
        color:'#a9a9a9',
        fontSize:16
      }}>Instructor</Text>
      <Text style={{
        fontFamily:'outfit-medium',
        fontSize:20
      }}>{course?.instructor?.name}</Text>

    </View>
   // console.log(JSON.stringify(course.instructor))


  )
}

export default InstructorInfor