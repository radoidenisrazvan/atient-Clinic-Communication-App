import React from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import RegisterPatientForm from './register/RegisterPatientForm';
import RegisterDoctorForm from './register/RegisterDoctorForm';

const RegisterScreen = ({ route, navigation }) => {
  const { userType } = route.params || { userType: 'Patient' };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollContainer} 
        contentContainerStyle={styles.contentContainer} 
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Register as {userType}</Text>
        
        {userType === 'Patient' && <RegisterPatientForm navigation={navigation} />}
        {userType === 'Doctor' && <RegisterDoctorForm navigation={navigation} />}
      </ScrollView>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 80, // Spațiu suplimentar pentru a evita suprapunerea cu butonul
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
