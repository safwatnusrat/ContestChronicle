import { Button, Text, View } from "react-native";
import {useRouter} from 'expo-router'
const index=()=> {
  const router=useRouter();
  return (
    
     
     <View>
     <Text>Index</Text>
    
      <Button title="welcome" onPress={()=>router.push('welcome')}/>
       
     </View>
  );
}
export default index
