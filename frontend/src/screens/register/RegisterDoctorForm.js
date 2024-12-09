import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { API_BASE_URL } from '../../config/api';

const RegisterDoctorForm = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    phone: '',
    professionalGrade: 'Unspecified',
    speciality: 'Unspecified',
    workSchedule: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    try {
      const dataToSend = { ...formData, role: "doctor" };
  
      // console.log("Submitting data:", dataToSend); // Log pentru verificare
      const response = await axios.post(`${API_BASE_URL}/api/auth/register`, dataToSend);
      // console.log("Response received:", response.data);
      Alert.alert("Success", response.data.message || "User registered successfully");
      navigation.navigate('Login', { userType: 'Doctor' });
    } catch (error) {
      console.error("Error response:", error.response?.data || error.message);
      Alert.alert("Error", error.response?.data?.message || "Registration failed");
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
        placeholder="Phone Number *"
        keyboardType="phone-pad"
        value={formData.phone}
        onChangeText={(value) => handleInputChange('phone', value)}
      />
     <TextInput
        style={styles.input}
        placeholder="Work Schedule *"
        value={formData.workSchedule}
        onChangeText={(value) => handleInputChange('workSchedule', value)}
      />

      <Text style={styles.label}>Professional Grade *</Text>
      <Picker
        selectedValue={formData.professionalGrade}
        onValueChange={(value) => handleInputChange('professionalGrade', value)}
        style={styles.picker}
      >
        <Picker.Item label="Unspecified" value="Unspecified" />
        <Picker.Item label="Resident" value="Resident" />
        <Picker.Item label="Specialist" value="Specialist" />
        <Picker.Item label="Consultant" value="Consultant" />
      </Picker>

      <Text style={styles.label}>Speciality *</Text>
      <Picker
        selectedValue={formData.speciality}
        onValueChange={(value) => handleInputChange('speciality', value)}
        style={styles.picker}
      >
        <Picker.Item label="Unspecified" value="Unspecified" />
        <Picker.Item label="General Medicine" value="General Medicine" />
        <Picker.Item label="Cardiology" value="Cardiology" />
        <Picker.Item label="Neurology" value="Neurology" />
        <Picker.Item label="Orthopedics" value="Orthopedics" />
      </Picker>

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

export default RegisterDoctorForm;
