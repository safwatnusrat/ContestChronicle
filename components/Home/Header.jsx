import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const Header = () => {
  const [userData, setUserData] = useState(null);
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userSnap = await getDoc(userDocRef);

          if (userSnap.exists()) {
            setUserData(userSnap.data());
          } else {
            console.log('No such user document!');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUserData();
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe(); // Cleanup function
  }, []);

  return (
    <View>
      <Text style={styles.welcomeText}>Welcome,</Text>
      {userData ? <Text style={styles.userinfo}>{userData.name}</Text> : <Text>Loading...</Text>}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  welcomeText: {
    fontFamily: 'outfit-regular',
    fontSize: 18,
  },
  userinfo: {
    fontSize: 18,
    fontFamily: 'outfit-medium',
  },
});
