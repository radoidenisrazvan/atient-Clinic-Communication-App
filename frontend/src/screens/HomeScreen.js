import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Alert, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProfileScreen from './ProfileScreen';
import { API_BASE_URL } from '../config/api';
import axios from 'axios';

const Drawer = createDrawerNavigator();

const Dashboard = ({ route }) => {
  const { name = 'Guest' } = route.params || {};
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await axios.get(`${API_BASE_URL}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserType(response.data.role);
      } catch (error) {
        console.error('Error fetching user role:', error);
        Alert.alert('Error', 'Failed to fetch user role.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.info}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome, {name}!</Text>
      {userType === 'doctor' ? (
        <>
          <Text style={styles.info}>Manage your <Text style={styles.boldText}>patients</Text> and appointments.</Text>
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>My Patients</Text>
              <Text style={styles.cardContent}>View and manage your patients</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Schedule</Text>
              <Text style={styles.cardContent}>Manage your daily appointments</Text>
            </View>
          </View>
        </>
      ) : (
        <>
          <Text style={styles.info}>Manage your <Text style={styles.boldText}>health records</Text> and appointments.</Text>
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Appointments</Text>
              <Text style={styles.cardContent}>View upcoming appointments</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Medical Records</Text>
              <Text style={styles.cardContent}>Access your health records</Text>
            </View>
          </View>
        </>
      )}
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
  const [profileImage, setProfileImage] = useState(null);

  const fetchUserProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.get(`${API_BASE_URL}/api/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.imageUrl) {
        setProfileImage(response.data.imageUrl);
      } else {
        setProfileImage(null);
      }
    } catch (error) {
      console.error('Error fetching profile image:', error);
      Alert.alert('Error', 'Failed to fetch profile image.');
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserProfile();
    }, [])
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', () => {
      fetchUserProfile();
    });

    return unsubscribe;
  }, [navigation]);

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
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerRight: () => (
          <View style={styles.headerContainer}>
            {profileImage && (
              <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
              </TouchableOpacity>
            )}
            <Text style={styles.logoutText} onPress={handleLogout}>Logout</Text>
          </View>
        ),
      }}
    >
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
    padding: 20,
  },
  welcome: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#007bff',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  card: {
    width: '45%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardContent: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  logoutText: {
    color: '#ff4d4d',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default HomeScreen;
