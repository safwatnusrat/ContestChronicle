import { Text, StyleSheet, View, Pressable, Alert, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { StatusBar } from 'expo-status-bar'
import BackButton from '../components/BackButton'
import { useRouter } from 'expo-router'
import Icon from '../assets/icons'
import Input from '../components/Input'
import { hp, wp } from '../helpers/common'
import Button from '../components/Button'
import { auth, db } from '../lib/firebase'
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Platform } from 'react-native';


const signup = () => {
  const router = useRouter();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const nameRef = useRef("");

  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[a-z0-9]+@(gmail|yahoo|org)\.com$/;
    return emailRegex.test(email);
  }

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    return passwordRegex.test(password);
  }

  const onSubmit = async () => {
    const email = emailRef.current.trim();
    const password = passwordRef.current.trim();
    const name = nameRef.current.trim();

    setEmailError("");
    setPasswordError("");
    setNameError("");

    let isValid = true;

    if (!name) {
      setNameError("Name cannot be empty.");
      isValid = false;
    }

    if (!validateEmail(email)) {
      setEmailError("Invalid email address.");
      isValid = false;
    }

    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 8 characters long and include a number and a uppercase,a lowercase and a specila character.");
      isValid = false;
    }

    if (isValid) {
      try {
        setLoading(true);

        const userInformation = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        await sendEmailVerification(userInformation.user);

        const userDoc = {
          name: name,
          email: email,
          emailVerification: false,
          createdAt: new Date().toISOString(),
        };

        await setDoc(doc(db, "users", userInformation.user.uid), userDoc);

        Alert.alert(
          "Successful",
          "Please Check your Email to Verify Your Account"
        );
        router.push("/login");

      } catch (err) {
        if (err.code === "auth/email-already-in-use") {
          setEmailError("Email already in use");
        } else {
          setEmailError("Failed to create account. Please try again.");
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

  };

  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}  // Corrected "Platfrom" to "Platform"
      style={styles.container}
    >
      <ScrollView>

      <ScreenWrapper >
        <StatusBar style='dark' />
        <View style={styles.container}>
          <BackButton router={router} 
          />

          <View>
            <Text style={styles.welcomeText}>Let's</Text>
            <Text style={styles.welcomeText}>Get Started</Text>
          </View>

          <View style={styles.form}>
            <Text style={{ fontSize: hp(1.9), color: '#494949' }}>
              Please fill the details to create an account
            </Text>
            <Input
              icon={<Icon name="user" size={26} strokeWidth={1.6} />}
              placeholder="Enter your username"
              onChangeText={(value) => nameRef.current = value}
            />
            {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
            <Input
              icon={<Icon name="email" size={26} strokeWidth={1.6} />}
              placeholder="Enter your email"
              onChangeText={(value) => emailRef.current = value}
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            <Input
              icon={<Icon name="lock" size={26} strokeWidth={1.6} />}
              placeholder="Enter your password"
              secureTextEntry
              onChangeText={(value) => passwordRef.current = value}
            />
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            <Button title={'Signup'} loading={loading} onPress={onSubmit} />
          </View>
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account!</Text>
            <Pressable onPress={() => router.push('login')}>
              <Text style={[styles.footerText, { color: 'orange', fontFamily: 'outfit-medium' }]}>Login</Text>
            </Pressable>
          </View>
        </View>
      </ScreenWrapper>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}


export default signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 55,
    paddingHorizontal: wp(5)
  },
  welcomeText: {
    fontSize: hp(5),
    fontFamily: 'outfit-bold',
    color: 'black'
  },
  form: {
    gap: 25
  },
  forgetPassword: {
    textAlign: 'right',
    fontFamily: 'outfit-medium'

  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5
  },
  footerText: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: hp(1.9)
  },
  errorText: {
    fontSize: hp(1.5),
    color: "red",
  },
})