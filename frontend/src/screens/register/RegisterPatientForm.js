import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { API_BASE_URL } from '../../config/api';

const RegisterPatientForm = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '', 
    password: '',
    confirmPassword: '',
    cnp: '',
    phone: '',
    address: '',
    birthDate: '',
    bloodType: 'Unknown',
    weight: '',
    height: '',
  });

  const handleInputChange = (key, value) => {
    if (key === 'birthDate') {
      value = value.replace(/[^0-9.]/g, '');
    }
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const [day, month, year] = formData.birthDate.split('.');
      const formattedDate = new Date(`${year}-${month}-${day}`);

      if (isNaN(formattedDate.getTime())) {
        Alert.alert('Error', 'Invalid Date of Birth. Please use the format DD.MM.YYYY');
        return;
      }

      const dataToSend = {
        ...formData,
        role: 'patient',
        birthDate: formattedDate, 
      };

      const response = await axios.post(`${API_BASE_URL}/api/auth/register`, dataToSend);

      Alert.alert('Success', response.data.message || 'Patient registered successfully');
      navigation.navigate('Login', { userType: 'Patient' });
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Name *"
        value={formData.name}
        onChangeText={(value) => handleInputChange('name', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Surname *"
        value={formData.surname}
        onChangeText={(value) => handleInputChange('surname', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email *"
        keyboardType="email-address"
        value={formData.email}
        onChangeText={(value) => handleInputChange('email', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password *"
        secureTextEntry
        value={formData.password}
        onChangeText={(value) => handleInputChange('password', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password *"
        secureTextEntry
        value={formData.confirmPassword}
        onChangeText={(value) => handleInputChange('confirmPassword', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="CNP *"
        keyboardType="numeric"
        value={formData.cnp}
        onChangeText={(value) => handleInputChange('cnp', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number *"
        keyboardType="phone-pad"
        value={formData.phone}
        onChangeText={(value) => handleInputChange('phone', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={formData.address}
        onChangeText={(value) => handleInputChange('address', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Date of Birth (DD.MM.YYYY) *"
        value={formData.birthDate}
        onChangeText={(value) => handleInputChange('birthDate', value)}
      />
      <Text style={styles.label}>Blood Group *</Text>
      <Picker
        selectedValue={formData.bloodType}
        onValueChange={(value) => handleInputChange('bloodType', value)}
        style={styles.picker}
      >
        <Picker.Item label="Unknown" value="Unknown" />
        <Picker.Item label="A+" value="A+" />
        <Picker.Item label="A-" value="A-" />
        <Picker.Item label="B+" value="B+" />
        <Picker.Item label="B-" value="B-" />
        <Picker.Item label="AB+" value="AB+" />
        <Picker.Item label="AB-" value="AB-" />
        <Picker.Item label="O+" value="O+" />
        <Picker.Item label="O-" value="O-" />
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Weight (kg)"
        keyboardType="numeric"
        value={formData.weight}
        onChangeText={(value) => handleInputChange('weight', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Height (cm)"
        keyboardType="numeric"
        value={formData.height}
        onChangeText={(value) => handleInputChange('height', value)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RegisterPatientForm;
