import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Home from './Home'
import ArrowLeft from './ArrowLeft'
import Email from './Email'
import Lock from './Lock'
import User from './User'
const icons={
   home:Home,
   arrowLeft:ArrowLeft,
   email:Email,
   lock:Lock,
   user:User

}
const Icon=({name,...props})=> {
    const IconComponent=icons[name];
  return (
    <IconComponent
    height={props.size||24}
    width={props.size||24}
    strokeWidth={props.strokeWidth||1.9}
    color='#7C7C7C'
    {...props}
    />
  )
}
export default Icon;

const styles = StyleSheet.create({})