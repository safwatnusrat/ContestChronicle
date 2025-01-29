import { View, Text,StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import Sliders from '../../components/Home/Sliders'
import CourseListByCategory from '../../components/Home/CourseListByCategory'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const home = () => {
  return (
    <View style={{
        padding:20,
        marginTop:10
    }}>
        <StatusBar style='dark'/>
        <Header/>
        <Sliders/>
        <CourseListByCategory/>
        <Link href={'add-new-course'} style={styles.container}>
        <Ionicons name="add-circle" size={24} color='#e2bc4d'/>
          <Text style={styles.textStyle}>
            Add New Course
          </Text>
        </Link>

    </View>
  )
}

export default home

const styles=StyleSheet.create({
  container:{
    display:'flex',
    flexDirection:'row',
    gap:10,
    alignItems:'center',
    padding:20,
    marginTop:20,
    backgroundColor:'#fff1c9',
    borderWidth:1,
    borderColor:'#e2bc4d',
    justifyContent:'center',
    borderRadius:15,
    borderStyle:'dashed',
    textAlign:'center'
  },
  textStyle:{
    ontFamily:'outfit-medium',
    fontSize:18,
    color:'#e2bc4d'
  }
})