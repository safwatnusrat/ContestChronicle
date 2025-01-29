import { View, Text} from 'react-native'
import { Tabs } from 'expo-router'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
const TabLayout= () => {
  return (
    <Tabs
       screenOptions={{
        tabBarActiveTintColor:'#FFA500'
       }}>
        <Tabs.Screen name='home'
        options={{
            title:'Home',
            headerShown:false,
            tabBarIcon:({color})=><Ionicons name="home" size={24} color={color} />
        }}/>
         <Tabs.Screen name='favourite'
        options={{
            title:'Favourite',
            headerShown:false,
            tabBarIcon:({color})=><Ionicons name="heart" size={24} color={color} />
        }}/>
        <Tabs.Screen name='profile'
        options={{
            title:'Profile',
            headerShown:false,
            tabBarIcon:({color})=><Ionicons name="people" size={24} color={color}/>
        }}/>
        

    </Tabs>
  )
}

export default TabLayout