import { View, Text } from 'react-native'
import React from 'react'

const InstructorInfor = ({course}) => {
  const instructor=course.instructor[0]
  console.log(typeof course.instructor)
  return (
    <View style={{
        paddingHorizontal:20,
        // display:'flex',
        flex:1,
        alignItems:'center',
        borderWidth:1,
        borderRadius:10,
        padding:20,
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
      }}>{JSON.stringify(course.instructor)}</Text>

    </View>
   // console.log(JSON.stringify(course.instructor))


  )
}

export default InstructorInfor