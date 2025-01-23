import { View, Text ,StyleSheet} from 'react-native';
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, getAuth } from "firebase/auth";

const Header = () => {
  const [user, setUser] = useState(null);
  auth=getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();  // Clean up the listener when component unmounts
  }, []);

  return (
    <View>
      <Text style={styles.welcomeText}>Welcome,</Text>
      {user ? <Text style={styles.userinfo} >{user.email}</Text> : <Text>Loading...</Text>}
    </View>
  );
};

export default Header;

const styles=StyleSheet.create({
    welcomeText: {
        fontFamily: 'outfit-regular',
        fontSize: 18,
      },
      userinfo: {
        fontSize: 18,
        fontFamily: 'outfit-medium',
      },
})
