import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react';
import Icon from '../assets/icons';
import { hp,wp } from '../helpers/common';

const BackButton = ({size=26,router}) => {
  return (
    <View>
     <Pressable onPress={()=>router.back()} style={styles.buttonStyle}>
        <Icon name='arrowLeft' strokeWidth={2.5} size={size} color='black'/>
     </Pressable>
    </View>
  )
}
export default BackButton;
const styles = StyleSheet.create({
    buttonStyle:{
        alignSelf:'flex-start',
        padding:5,
        borderRadius:5,
        marginTop:hp(5),
        marginBottom:20
    }
})