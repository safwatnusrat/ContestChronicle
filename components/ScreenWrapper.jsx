import { StyleSheet,View, Text } from 'react-native'
import React from 'react'
import { useSafeAreaFrame } from 'react-native-safe-area-context'

const ScreenWrapper = ({children,bg}) => {
    const {top} =useSafeAreaFrame();
    const topPadding=top>0? top+5:30;
  return (
    <View style={{flex:1,topPadding,backgroundColor:bg}}>
      {
        children
      }
    </View>
  )
}

export default ScreenWrapper

const styles=StyleSheet.create({

})