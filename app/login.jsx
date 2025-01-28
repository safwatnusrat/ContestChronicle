import {Text,StyleSheet,View, Pressable} from 'react-native'
import React, { useRef, useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { StatusBar } from 'expo-status-bar'
import BackButton from '../components/BackButton'
import { useRouter } from 'expo-router'
import Icon from '../assets/icons'
import Input from '../components/Input'
import { hp ,wp} from '../helpers/common'
import Button from '../components/Button'
import { Alert } from 'react-native'
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";

const login=()=> {
    const router=useRouter();
    const emailRef=useRef("");
    const passwordRef=useRef("");
    const auth=getAuth();
   
    const [loading,setLoading]=useState(false);
    
    const onSubmit= async()=>{
        setLoading(true);
        try{
            const userInformation= await signInWithEmailAndPassword(
                auth,
                emailRef.current.trim(),
                passwordRef.current.trim()
            );
            const user=userInformation.user;
            if(!user.emailVerified){
                Alert.alert(
                    "Email not verified","Please verify your email to continue."
                );
            }
            else{
                router.push('/home');
            }

        }
        catch(err){
            Alert.alert("Login Error",err.message);
        }
        finally{
            setLoading(false);
        }
    };
    return (
        <ScreenWrapper>
          <StatusBar style='dark'/>
          <View style={styles.container}>
            <BackButton router={router}/>

            <View>
                <Text style={styles.welcomeText}>Hey,</Text>
                <Text style={styles.welcomeText}>Welcome Back</Text>
            </View>

            <View style={styles.form}>
                <Text style={{fontSize:hp(1.9),color:'#494949'}}>
                    Please login to continue
                </Text>
                <Input
                   icon={<Icon name="email" size={26} strokeWidth={1.6} />}
                   placeholder="Enter your email"
                   onChangeText={(value) => emailRef.current=value}
                />
                <Input
                   icon={<Icon name="lock" size={26} strokeWidth={1.6} />}
                   placeholder="Enter your password"
                   secureTextEntry
                   onChangeText={(value) => passwordRef.current=value}
                />
                <Text style={styles.forgetPassword}>Forget Password?</Text>
                <Button title={'Login'} loading={loading} onPress={onSubmit}/>
            </View>
            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have an account?</Text>
              <Pressable onPress={()=>router.push('/signup')}>
                <Text style={[styles.footerText,{color:'orange' ,fontFamily: 'outfit-medium'}]}>Sign up</Text>
              </Pressable>
            </View>
          </View>
        </ScreenWrapper>
    )
}


export default login;

const styles=StyleSheet.create({
    container:{
       flex:1,
       gap:55,
       paddingHorizontal:wp(5)
    },
    welcomeText:{
       fontSize:hp(5),
       fontFamily:'outfit-bold',
       color:'black'
    },
    form:{
        gap:25
    },
    forgetPassword:{
        textAlign:'right',
        fontFamily:'outfit-medium'

    },
    footer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        gap:5
    },
    footerText:{
        justifyContent:'center',
        alignItems:'center',
        fontSize:hp(1.9)

    }
})