import axios from 'axios';
import { getDocs, collection, addDoc } from 'firebase/firestore';
import { db } from './../../lib/firebase';
import * as ImagePicker from 'expo-image-picker';
import { ToastAndroid } from 'react-native';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { getAuth } from 'firebase/auth';
import { Picker } from '@react-native-picker/picker';
import Category from '../../components/Home/Category';
const index = () => {
  const [formData, setFormData] = useState({});
  const [level, setLevel] = useState();
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [images, setImages] = useState();

  const [user,setUser]=useState();
  const auth = getAuth();
  const currentUser = auth.currentUser;
     useEffect(() => {
      getCategories();
      const fetchUserData = async () => {
  
        if (currentUser) {
          try {
            const db = getFirestore();
            const userDocRef = doc(db, 'users', currentUser.uid); // Use the UID of the authenticated user
            const userDoc = await getDoc(userDocRef);
  
            if (userDoc.exists()) {
              setUser(userDoc.data());
            } else {
              console.log('No user document found');
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        }
      };
  
      fetchUserData();
    }, []);

  const getCategories = async () => {
    setCategoryList([]);
    const snapshot = await getDocs(collection(db, 'category'));
    snapshot.forEach((doc) => {
      console.log(doc.data());
      setCategoryList(categoryList => [...categoryList, doc.data()]);
    });
  };

  const imagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImages(result.assets[0].uri);
    } else {
      alert('You did not select any image.');
    }
  };

  const handleInputChange = (fieldName, fieldValue) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: fieldValue
    }));
  };

  const uploadImageToImgBB = async (imageUri) => {
    const apiKey = '3533a245841b65f062dc25c6eeff73fa';
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'upload.jpg',
    });

    try {
      const response = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.data.url;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const onSubmit = async () => {
    if (Object.keys(formData).length !== 5) {
      ToastAndroid.show("Fill all the fields", ToastAndroid.SHORT);
      return;
    }

    const imageUrl = await uploadImageToImgBB(images);
    if (!imageUrl) {
      ToastAndroid.show("Image upload failed", ToastAndroid.SHORT);
      return;
    }

    const courseData = {
      ...formData,
      imageUrl,
      favourites: [],
      id: Date.now().toString(),
      instructor: {
        email: currentUser.email,
        name: currentUser.name,
      },
    };

    try {
      await addDoc(collection(db, 'courses'), courseData);
      ToastAndroid.show("Course added successfully", ToastAndroid.SHORT);
    } catch (error) {
      console.error('Error adding course:', error);
      ToastAndroid.show("Error adding course", ToastAndroid.SHORT);
    }
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontFamily: 'outfit-medium', fontSize: 20 }}>Add New Course</Text>
      <Pressable onPress={imagePicker}>
        {!images ? (
          <Image
            source={require('./../../assets/images/addimage.jpg')}
            style={{
              width: 100,
              height: 100,
              borderRadius: 15,
              borderWidth: 1,
              borderColor: '#808080',
            }}
          />
        ) : (
          <Image
            source={{ uri: images }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 15,
              borderWidth: 1,
              borderColor: '#808080',
            }}
          />
        )}
      </Pressable>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Course Name *</Text>
        <TextInput style={styles.input} onChangeText={(value) => handleInputChange('name', value)} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Level *</Text>
        <Picker
          selectedValue={selectedCategory}
          style={styles.input}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedCategory(itemValue);
            handleInputChange('level', itemValue);
          }}
        >
          <Picker.Item label="Select Level" value="" />
          <Picker.Item label="Beginner" value="Beginner" />
          <Picker.Item label="Intermediate" value="Intermediate" />
          <Picker.Item label="Advanced" value="Advanced" />
        </Picker>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Category *</Text>
        <Picker
          selectedValue={level}
          style={styles.input}
          onValueChange={(itemValue, itemIndex) => {
            setLevel(itemValue);
            handleInputChange('category', itemValue);
          }}
        >
          <Picker.Item label="Select Category" value="" />
          {categoryList.map((Category, index) => (
            <Picker.Item key={index} label={Category.name} value={Category.name} />
          ))}
        </Picker>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Duration *</Text>
        <TextInput style={styles.input} onChangeText={(value) => handleInputChange('duration', value)} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>About *</Text>
        <TextInput
          style={[styles.input, { minHeight: 120, textAlignVertical: 'top' }]}
          numberOfLines={5}
          multiline={true}
          onChangeText={(value) => handleInputChange('about', value)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={{ fontFamily: 'outfit-medium', textAlign: 'center' }}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 5,
  },
  input: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    fontFamily: 'outfit-regular',
  },
  label: {
    marginVertical: 5,
    fontFamily: 'outfit-regular',
  },
  button: {
    padding: 15,
    backgroundColor: '#e2bc4d',
    borderRadius: 7,
    marginVertical: 50,
    marginBottom: 50,
  },
});

export default index;