import { View, Text ,Image,StyleSheet} from 'react-native'
import React from 'react'

const CourseListItem = ({course}) => {
  return (
    <View style={styles.container}>
     <Image source={{uri:course?.imageUrl}} 
     style={{
        width:150,
        height:135,
        objectFit:'cover',
        borderRadius:10
     }}/>
     <Text style={{
        fontFamily:'outfit-medium',
        marginTop:5,
        fontSize:18
     }}>{course?.name}</Text>
     <Text style={{
        fontFamily:'outfit-regular',
        fontSize:14
     }}>{course?.duration}</Text>
    
    </View>
  )
}

export default CourseListItem

const styles=StyleSheet.create({
    container:{
        marginTop:15,
        padding:10,
        marginRight:15,
        borderRadius: 10,
        overflow: 'hidden', 
        backgroundColor: 'white', 
    }
})