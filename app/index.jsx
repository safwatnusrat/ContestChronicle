import { View } from "react-native";
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { onAuthStateChanged, getAuth } from "firebase/auth";
import Loading from '../components/Loading';

const index = () => {
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        // User is signed in and email is verified, redirect to dashboard
        router.replace('/(tabs)/home'); 
      } else {
        // No user is signed in, redirect to welcome screen
        router.replace('/welcome');
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Loading />
    </View>
  );
}

export default index;
