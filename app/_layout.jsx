import { Stack } from "expo-router";
import {useFonts} from 'expo-font';
import { StatusBar } from "react-native";

export default function RootLayout() {

  useFonts({
    'outfit':require('./../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium':require('./../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold':require('./../assets/fonts/Outfit-Bold.ttf'),
  })
  return (
   <Stack screenOptions={{headerShown:false}}>
  
 
  <Stack.Screen name="index" />
  <Stack.Screen name="login" />
</Stack>

  );
}
