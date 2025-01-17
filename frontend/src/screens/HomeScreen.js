import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProfileScreen from './ProfileScreen'; 

const Drawer = createDrawerNavigator();

const Dashboard = ({ route, navigation }) => {
  const { userType = 'User', name = 'Guest' } = route.params || {};

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      Alert.alert('Logged Out', 'You have been logged out successfully!');
      navigation.reset({
        index: 0,
        routes: [{ name: 'UserTypeSelection' }],
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

const Settings = () => (
  <View style={styles.container}>
    <Text style={styles.welcome}>Settings</Text>
    <Text style={styles.info}>Configure your application settings here.</Text>
  </View>
);

const HomeScreen = ({ route, navigation }) => {
  return (
    <Drawer.Navigator initialRouteName="Dashboard">
      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
        initialParams={route.params}
        options={{ title: 'Dashboard' }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen} 
        options={{ title: 'Profile' }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{ title: 'Settings' }}
      />
    </Drawer.Navigator>
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
