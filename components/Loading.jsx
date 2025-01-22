import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

const Loading = ({size='large',color='#00C26F'}) => {
  return (
    <View style={{justifyContent:'center',alignItems:'center'}}>
     <ActivityIndicator size ={size} color={color}></ActivityIndicator>
    </View>
  )
}

export default Loading

const styles=StyleSheet.create({

});