import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ route, navigation }) => {
  const { userType = 'User', name = 'Guest' } = route.params || {};

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear(); // Șterge toate datele salvate în AsyncStorage
      Alert.alert('Logged Out', 'You have been logged out successfully!');
      navigation.reset({
        index: 0,
        routes: [{ name: 'UserTypeSelection' }], // Redirecționează la ecranul UserTypeSelection
      });
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', 'An error occurred while logging out. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome, {name}!</Text>
      <Text style={styles.info}>You are logged in as {userType}.</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
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
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 18,
    color: '#333',
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#ff4d4d',
    padding: 15,
    borderRadius: 8,
    width: '60%',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default HomeScreen;
