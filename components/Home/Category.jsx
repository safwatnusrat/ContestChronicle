import { View, Text ,FlatList,Image,StyleSheet, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from "firebase/firestore";
import {db} from './../../lib/firebase'
import { StatusBar } from 'expo-status-bar';

const Category = ({category}) => {
    const [categoryList,setCategoryList]=useState([]);
    const [selectedCategory,setSelectedCategory]=useState('Machine Learning');
    useEffect(()=>{
        getCategories();
    },[])

    const getCategories=async()=>{
        setCategoryList([]);
        const snapshot = await getDocs(collection(db,'category'));
        snapshot.forEach((doc)=>{
            console.log(doc.data());
            setCategoryList(categoryList=>[...categoryList,doc.data()])
        })
    }
  return (
    <View style={{
        marginTop:20
    }}>
        <StatusBar style='dark'/>
      <Text style={{
        fontFamily:'outfit-medium',
        fontSize:20
      }}>Category</Text>
      <FlatList
      data={categoryList}
      numColumns={4}
      renderItem={({item,index})=>(
        <TouchableOpacity 
        onPress={()=>{
          setSelectedCategory(item.name);
          category(item.name);
        }}
        style={{
            flex:1
        }}
        >
            <View style={[styles.container,
            selectedCategory==item.name && styles.selectedItemCategory]}>
               <Image source={{uri:item?.imageUrl}}
               style={{
                 width:40,
                 height:40
               }}
               />
            </View>
            <Text
            style={{
                textAlign:'center',
                fontFamily:'outfit-regular'
            }}>{item?.name}</Text>
        </TouchableOpacity>
      )}/>
    </View>
  )
}

export default Category

const styles=StyleSheet.create({
    container:{
      backgroundColor:'#fff1c9',
      borderColor:'#fff1c9',
      padding:15,
      alignItems:'center',
      borderWidth:1,
      borderRadius:15,
     margin:5
    },
    selectedItemCategory:{
      backgroundColor:'#0096C7',
      borderColor:'#0096C7'
    }
})