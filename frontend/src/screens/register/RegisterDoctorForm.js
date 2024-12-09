import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';


const RegisterDoctorForm = () => {
  const [professionalGrade, setProfessionalGrade] = React.useState('Unspecified');
  const [speciality, setSpeciality] = React.useState('Unspecified');

  return (
    <View>
      <TextInput style={styles.input} placeholder="Name *" />
      <TextInput style={styles.input} placeholder="Surname *" />
      <TextInput style={styles.input} placeholder="Phone Number *" keyboardType="phone-pad" />

      <Text style={styles.label}>Professional Grade *</Text>
      <Picker
        selectedValue={professionalGrade}
        onValueChange={(itemValue) => setProfessionalGrade(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Unspecified" value="Unspecified" />
        <Picker.Item label="Resident" value="Resident" />
        <Picker.Item label="Specialist" value="Specialist" />
        <Picker.Item label="Consultant" value="Consultant" />
      </Picker>

      <Text style={styles.label}>Speciality *</Text>
      <Picker
        selectedValue={speciality}
        onValueChange={(itemValue) => setSpeciality(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Unspecified" value="Unspecified" />
        <Picker.Item label="General Medicine" value="General Medicine" />
        <Picker.Item label="Cardiology" value="Cardiology" />
        <Picker.Item label="Neurology" value="Neurology" />
        <Picker.Item label="Orthopedics" value="Orthopedics" />
      </Picker>

      <TextInput style={styles.input} placeholder="Work Schedule *" />
      <TextInput style={styles.input} placeholder="Email *" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Password *" secureTextEntry />
      <TextInput style={styles.input} placeholder="Confirm Password *" secureTextEntry />
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

export default RegisterDoctorForm;
