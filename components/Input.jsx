import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native'
import { hp,wp } from '../helpers/common'

const Input = ({ icon, inputRef, containerStyles, ...rest }) => {
    return (
      <View style={[styles.container, containerStyles]}>
        {icon && icon}
  
        <TextInput 
          style={{ flex: 1 }}
          placeholderTextColor="#7C7C7C"
          ref={inputRef}
          {...rest}
        />
      </View>
    );
  };
  
export default Input

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        height:hp(7.2),
        alignItems:'center',
        justifyContent:'center',
        borderWidth:0.4,
        borderColor:'494949',
        borderRadius:22,
        borderCurve:'continuous',
        paddingHorizontal:18,
        gap:12

    }
})