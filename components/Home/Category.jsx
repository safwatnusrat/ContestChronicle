import { View, Text ,FlatList,Image,StyleSheet} from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from "firebase/firestore";
import {db} from './../../lib/firebase'

const Category = () => {
    const [categoryList,setCategoryList]=useState([]);
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
      <Text style={{
        fontFamily:'outfit-medium',
        fontSize:20
      }}>Category</Text>
      <FlatList
      data={categoryList}
      numColumns={4}
      renderItem={({item,index})=>(
        <View style={{
            flex:1
        }}>
            <View style={styles.container}>
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
        </View>
      )}/>
    </View>
  )
}

export default Category

const styles=StyleSheet.create({
    container:{
      backgroundColor:'#fff1c9',
      padding:15,
      alignItems:'center',
      borderWidth:1,
      borderRadius:15,
     margin:5
    }
})