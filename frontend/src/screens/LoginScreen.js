import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const LoginScreen = ({ route, navigation }) => {
  // Folosește un fallback dacă `route.params` sau `route.params.userType` sunt undefined
  const userType = route?.params?.userType || 'User'; // Default: 'User'

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login as {userType}</Text>
      
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        keyboardType="email-address" 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        secureTextEntry 
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.link}
        onPress={() => navigation.navigate('Register', { userType })}
        >
        <Text style={styles.linkText}>
            Don't have an account? Sign up as {userType}.
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  link: {
    marginTop: 20,
  },
  linkText: {
    color: '#007bff',
    fontSize: 16,
  },
});

export default LoginScreen;
