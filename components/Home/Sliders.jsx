import { View, Image,FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from "firebase/firestore";
import {db} from './../../lib/firebase'
import { StyleSheet } from 'react-native';
import { wp,hp } from '../../helpers/common';
const Sliders = () => {

    const [sliderList,setsliderList]=useState([]);
    useEffect(()=>{
        getSliders();
    },[])

    const getSliders=async()=>{
        setsliderList([]);
        const snapshot = await getDocs(collection(db,'sliders'));
        snapshot.forEach((doc)=>{
            console.log(doc.data());
            setsliderList(sliderList=>[...sliderList,doc.data()])
        })
    }
  return (
    <View style={{
        marginTop:15
    }}>
      <FlatList
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      data={sliderList}
      renderItem={({item,index})=>(
        <View>
          <Image source={{uri:item?.imageUrl}}
          style={styles.imageslider}
          />
        </View>

      )}
   
     />
     
    </View>
  )
}

export default Sliders

const  styles=StyleSheet.create({
    imageslider:{
        height:170,
        width:wp(90),
        borderRadius:15,
        marginRight:15
    }
})