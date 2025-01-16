import React, { useEffect, useState } from 'react';
import { StyleSheet, StatusBar, ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserTypeSelectionScreen from './src/screens/UserTypeSelectionScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const userType = await AsyncStorage.getItem('userType');
        const name = await AsyncStorage.getItem('userName');

        if (token && userType && name) {
          setIsLoggedIn(true);
          setUserData({ userType, name });
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName={isLoggedIn ? 'Home' : 'UserTypeSelection'}>
        {/* Select User Type Screen */}
        <Stack.Screen 
          name="UserTypeSelection" 
          component={UserTypeSelectionScreen} 
          options={{ title: 'Select User Type' }} 
        />
        {/* Login Screen */}
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={({ route }) => ({
            title: `Login as ${route?.params?.userType || 'User'}`,
          })} 
        />
        {/* Register Screen */}
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={({ route }) => ({
            title: `Register as ${route?.params?.userType || 'User'}`,
          })} 
        />
        {/* Home Screen */}
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Home' }} 
          initialParams={userData} // Transmite datele utilizatorului
        />
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{ title: 'Profile' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});
