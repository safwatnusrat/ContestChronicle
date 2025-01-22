import { View, Text,StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { hp } from '../helpers/common'
import Loading from './Loading'

const Button=({
    buttonStyle,
    textStyle,
    title='',
    onPress=()=>{},
    loading=false,
    hasShadow=true

})=> {

    const shadowStyle={
       elevation:4

    }
    if(loading){
        return(
        <View style={[styles.button,buttonStyle,{backgroundColor:'white'}]}>
            <Loading/>

        </View>
        );
    }
  return (
    <Pressable onPress={onPress} style={[styles.button,buttonStyle,hasShadow && shadowStyle]}>
   
      <Text style={[styles.text,textStyle]}>{title} </Text>
      </Pressable>
  )
}

export default Button
const styles=StyleSheet.create({
    button:{
      backgroundColor:'orange',
      height:hp(6.6),
      alignItems:'center',
      justifyContent:'center',
      borderCurve:'continuous',
      borderRadius:12
    },
    text:{
        fontSize:hp(2.5),
        color:'white',
        textAlign:'center',


    }
    
})