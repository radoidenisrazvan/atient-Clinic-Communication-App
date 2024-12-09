import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
 

const RegisterPatientForm = () => {
  const [bloodType, setBloodType] = React.useState('Unknown');

  return (
    <View>
      <TextInput style={styles.input} placeholder="Name *" />
      <TextInput style={styles.input} placeholder="Surname *" />
      <TextInput style={styles.input} placeholder="CNP *" keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Phone Number *" keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Address" />
      <TextInput style={styles.input} placeholder="Date of Birth *" />
      
      <Text style={styles.label}>Blood Group *</Text>
      <Picker
        selectedValue={bloodType}
        onValueChange={(itemValue) => setBloodType(itemValue)}
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

      <TextInput style={styles.input} placeholder="Weight (kg)" keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Height (cm)" keyboardType="numeric" />
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
});

export default RegisterPatientForm;
