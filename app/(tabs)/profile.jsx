import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useState,useEffect } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { getAuth,signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'expo-router';
const profile = () => {
   const [user,setUser]=useState();
   useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (currentUser) {
        try {
          const db = getFirestore();
          const userDocRef = doc(db, 'users', currentUser.uid); // Use the UID of the authenticated user
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setUser(userDoc.data());
          } else {
            console.log('No user document found');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  const Menu=[
    {
      id:1,
      name:'Add New Course',
      icon:"add-circle-outline",
      path:'/add-new-course'
    },
    {
      id:2,
      name:'Favourites',
      icon:'heart',
      path:'/(tabs)/favourite'
    },
    {
      id:3,
      name:'LogOut',
      icon:"log-out",
      path:'logout'
    }
  ]
  const router=useRouter();
  const onPressMenu=async(Menu)=>{
    if(Menu.name === 'LogOut'){
      try {
        const auth = getAuth();
        await signOut(auth); 
        router.replace('/welcome'); 
      } catch (error) {
        console.error('Error during logout:', error);
      }
    }
    else{
     router.push(Menu.path);
    }
  }
  return (
    <View style={{
      padding:20,
      marginTop:20
    }}>
      <Text style={{
        fontFamily:'outfit-regular',
        fontSize:30
      }}>profile</Text>

      <View style={{
        display:'flex',
        alignItems:'center',
        marginVertical:25
      }}>
       <Text style={{
        textAlign:'center',
        alignItems:'center'
       }}>MIght be a picture</Text>
       {user ? (
          <>
            <Text style={{
              fontFamily:'outfit-bold',
              fontSize:20,
              marginTop:7
            }}>{user.name}</Text>
            <Text style={{
              fontFamily:'outfit-regular',
              fontSize:16,
              color:'#a9a9a9'
            }}>{user.email}</Text>
          </>
        ) : (
          <Text>Loading user data...</Text>
        )}
      </View>
      <FlatList
      data={Menu}
      renderItem={({item,index})=>(
           <TouchableOpacity 
           onPress={()=>onPressMenu(item)}
           key={item.id}
           style={{
            marginVertical:10,
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            gap:10,
            backgroundColor:'white',
            padding:10,
            borderRadius:10
           }}>
            <Ionicons name={item?.icon} size={35} 
            color='#FFA500'
            style={{
              backgroundColor:'#fff1c9',
              padding:10,
              borderRadius:10
            }}/>
            <Text style={{
              fontFamily:'outfit-regular',
              fontSize:20
            }}>{item.name}</Text>
            </TouchableOpacity>
      )}/>
    </View>
  )
}

export default profile