import { View, Text,StyleSheet,Image, Pressable } from 'react-native'
import React from 'react'
import { hp, wp } from '../helpers/common'
import  Button  from '../components/Button'
import { useRouter } from 'expo-router'
import { ScreenWrapper } from '../components/ScreenWrapper'
import { StatusBar } from 'expo-status-bar'

const welcome = () => {
    const router=useRouter();
  return (
       
    <View style={styles.container} >
     <Image style={styles.welcomeImage} source={require('../assets/images/login.jpg.png')} resizeMode='contain'/>
     <View style={{gap:20}}>
        <Text style={styles.title}>SkillSphere</Text>
        <Text style={styles.punchline}>Learn, Teach, Thrive—Together!</Text>

     </View>
     <View style={styles.footer}>
        <Button title='Getting Started' 
        buttonStyle={{marginHorizontal:wp(3)}}
        onPress={()=>router.push('/signup')}/>

     </View>
     <View style={styles.bottomTextContainter}>
        <Text style={styles.loginText}>Already have an account?</Text>
        <Pressable onPress={()=>router.push('/login')}>
            <Text style={[styles.loginText,{color:'orange'}]}>Login</Text>
        </Pressable>

     </View>
    </View>
 
  
  )
}

export default welcome

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'space-around',
        backgroundColor:'white',
        paddingHorizontal:wp(4)
    },
    welcomeImage:{
        height:hp(40),
        width:wp(100),
        alignSelf:'center'
    },
    title:{
        color:'orange',
        fontFamily:'outfit-bold',
        fontSize:hp(4),
        textAlign:'center'
    },
    punchline:{
        color:'black',
        fontFamily:'outfit-medium',
        fontSize:hp(3),
        paddingHorizontal:wp(6),
    },
    footer:{
        width:'100%',
        gap:40
    },
    bottomTextContainter:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        gap:5
    },
    loginText:{
        textAlign:'center',
        color:'black',
        fontFamily:'outfit-medium',
        fontSize:hp(1.9),
        marginBottom:20
    }
})