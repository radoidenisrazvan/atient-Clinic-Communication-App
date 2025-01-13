import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserTypeSelectionScreen from './src/screens/UserTypeSelectionScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="UserTypeSelection">
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
            title: `Login as ${route.params?.userType || 'User'}`,
          })} 
        />
        {/* Register Screen */}
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={({ route }) => ({
            title: `Register as ${route.params?.userType || 'User'}`,
          })} 
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Home' }} 
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
