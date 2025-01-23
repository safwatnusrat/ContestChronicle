import { View, Text } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import Sliders from '../../components/Home/Sliders'
import CourseListByCategory from '../../components/Home/CourseListByCategory'

const home = () => {
  return (
    <View style={{
        padding:20,
        marginTop:10
    }}>
        <Header/>
        <Sliders/>
        <CourseListByCategory/>

    </View>
  )
}

export default home