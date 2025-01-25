import { View, Text,Image } from 'react-native'
import React from 'react'

const CourseSubinfo = ({course}) => {
  return (
    <View style={{
        paddingHorizontal:20,
        flexDirection:'row'
    }}>
       <View style={{
        flex:1
       }}>
        <View style={{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            backgroundColor:'white',
            borderRadius:10,
            padding:10,
            margin:5,
            gap:10
        }}>
            <Image source={(require('./../../assets/images/duration.png'))}
            style={{
                height:30,
                width:30
            }}/>
            <View>
                <Text style={{
                    fontFamily:'outfit-regular',
                    fontSize:16,
                    color:'#a9a9a9'
                }}>Duration</Text>
                <Text style={{
                    fontFamily:'outfit-medium',
                    fontSize:20
                }}>{course.duration}</Text>

            </View>
        </View>
       </View>

       <View style={{
        flex:1
       }}>
        <View style={{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            backgroundColor:'white',
            borderRadius:10,
            padding:10,
            margin:5,
            gap:10,
        }}>
            <Image source={(require('./../../assets/images/difficulty_level.png'))}
            style={{
                height:30,
                width:30
            }}/>
            <View>
                <Text style={{
                    fontFamily:'outfit-regular',
                    fontSize:16,
                    color:'#a9a9a9'
                }}>Level</Text>
                <Text style={{
                    fontFamily:'outfit-medium',
                    fontSize:20
                }}>{course.level}</Text>

            </View>
        </View>
       </View>
       
    </View>
  )
}

export default CourseSubinfo