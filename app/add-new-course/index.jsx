import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import {Picker} from '@react-native-picker/picker';

const index = () => {
  const [formData, setFormData] = useState();
  useEffect(() => {

  }, [])

  const handleInputChange = (fieldName, fieldvalue) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: fieldvalue

    }))

  }
  return (
    <ScrollView style={{
      padding: 20
    }}>
      <Text style={{
        fontFamily: 'outfit-medium',
        fontSize: 20
      }}>Add New Course</Text>
      <Image source={require('./../../assets/images/addimage.jpg')}
        style={{
          width: 100,
          height: 100,
          borderRadius: 15,
          borderWidth: 1,
          borderColor: '#808080'
        }}
      />
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Course Name *</Text>
        <TextInput style={styles.input}
          onChangeText={(value) => handleInputChange('name', value)} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Category *</Text>
        <TextInput style={styles.input}
          onChangeText={(value) => handleInputChange('category', value)} />
      </View>
      <Picker
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedLanguage(itemValue)
        }>
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Level *</Text>
        <TextInput style={styles.input}
          onChangeText={(value) => handleInputChange('level', value)} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Duration *</Text>
        <TextInput style={styles.input}
          onChangeText={(value) => handleInputChange('duration', value)} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>About *</Text>
        <TextInput style={[styles.input, { minHeight: 120, textAlignVertical: 'top' }]}
          numberOfLines={5}
          multiline={true}
          onChangeText={(value) => handleInputChange('about', value)} />
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={{
          fontFamily: 'outfit-medium',
          textAlign: 'center'
        }}> Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 5
  },
  input: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    fontFamily: 'outfit-regular'
  },
  label: {
    marginVertical: 5,
    fontFamily: 'outfit-regular'
  },
  button: {
    padding: 15,
    backgroundColor: '#e2bc4d',
    borderRadius: 7,
    marginVertical: 100
  }
})

export default index
