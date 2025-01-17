import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../config/api';
import axios from 'axios';

const ProfileScreen = () => {
  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [userRole, setUserRole] = useState('');

  // State-uri pentru gestionarea schimbării parolei
  const [passwordData, setPasswordData] = useState({
    password: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await axios.get(`${API_BASE_URL}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
        setUserRole(response.data.role);
      } catch (error) {
        console.error('Error fetching user data:', error);
        Alert.alert('Error', 'Failed to fetch user data.');
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (key, value) => {
    setUserData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handlePasswordChange = (key, value) => {
    setPasswordData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');

      const updatedData = {
        name: userData.name || '',
        surname: userData.surname || '',
        phone: userData.phone || '',
        ...(userRole === 'doctor' && {
          professionalGrade: userData.professionalGrade || '',
          speciality: userData.speciality || '',
          workSchedule: userData.workSchedule || '',
        }),
        ...(userRole === 'patient' && {
          address: userData.address || '',
          birthDate: userData.birthDate || '',
          bloodType: userData.bloodType || '',
          weight: userData.weight || '',
          height: userData.height || '',
        }),
      };

      await axios.put(`${API_BASE_URL}/api/user/profile`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Alert.alert('Success', 'Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile.');
    }
  };

  const handleChangePassword = async () => {
    if (!passwordData.password || !passwordData.newPassword || !passwordData.confirmNewPassword) {
      Alert.alert('Error', 'Please fill in all password fields.');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      Alert.alert('Error', 'New passwords do not match.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('userToken');
      await axios.post(
        `${API_BASE_URL}/api/user/change-password`,
        {
          currentPassword: passwordData.password,
          newPassword: passwordData.newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      Alert.alert('Success', 'Password changed successfully!');
      setPasswordData({
        password: '',
        newPassword: '',
        confirmNewPassword: '',
      });
    } catch (error) {
      console.error('Error changing password:', error);
      Alert.alert('Error', 'Failed to change password. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <TextInput
        style={styles.input}
        value={userData.name || ''}
        onChangeText={(value) => handleInputChange('name', value)}
        editable={isEditing}
        placeholder="Name"
      />
      <TextInput
        style={styles.input}
        value={userData.surname || ''}
        onChangeText={(value) => handleInputChange('surname', value)}
        editable={isEditing}
        placeholder="Surname"
      />
      <TextInput
        style={styles.input}
        value={userData.email || ''}
        editable={false}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        value={userData.phone || ''}
        onChangeText={(value) => handleInputChange('phone', value)}
        editable={isEditing}
        placeholder="Phone"
      />

      {userRole === 'doctor' && (
        <>
          <TextInput
            style={styles.input}
            value={userData.professionalGrade || ''}
            onChangeText={(value) => handleInputChange('professionalGrade', value)}
            editable={isEditing}
            placeholder="Professional Grade"
          />
          <TextInput
            style={styles.input}
            value={userData.speciality || ''}
            onChangeText={(value) => handleInputChange('speciality', value)}
            editable={isEditing}
            placeholder="Speciality"
          />
          <TextInput
            style={styles.input}
            value={userData.workSchedule || ''}
            onChangeText={(value) => handleInputChange('workSchedule', value)}
            editable={isEditing}
            placeholder="Work Schedule"
          />
        </>
      )}

      {userRole === 'patient' && (
        <>
          <TextInput
            style={styles.input}
            value={userData.address || ''}
            onChangeText={(value) => handleInputChange('address', value)}
            editable={isEditing}
            placeholder="Address"
          />
          <TextInput
            style={styles.input}
            value={userData.birthDate?.split('T')[0] || ''}
            onChangeText={(value) => handleInputChange('birthDate', value)}
            editable={isEditing}
            placeholder="Birth Date (YYYY-MM-DD)"
          />
          <TextInput
            style={styles.input}
            value={userData.bloodType || ''}
            onChangeText={(value) => handleInputChange('bloodType', value)}
            editable={isEditing}
            placeholder="Blood Type"
          />
          <TextInput
            style={styles.input}
            value={userData.weight?.toString() || ''}
            onChangeText={(value) => handleInputChange('weight', value)}
            editable={isEditing}
            placeholder="Weight"
          />
          <TextInput
            style={styles.input}
            value={userData.height?.toString() || ''}
            onChangeText={(value) => handleInputChange('height', value)}
            editable={isEditing}
            placeholder="Height"
          />
        </>
      )}

      {isEditing ? (
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={() => setIsEditing(true)}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.subTitle}>Change Password</Text>
      <TextInput
        style={styles.input}
        value={passwordData.password}
        onChangeText={(value) => handlePasswordChange('password', value)}
        placeholder="Current Password"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        value={passwordData.newPassword}
        onChangeText={(value) => handlePasswordChange('newPassword', value)}
        placeholder="New Password"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        value={passwordData.confirmNewPassword}
        onChangeText={(value) => handlePasswordChange('confirmNewPassword', value)}
        placeholder="Confirm New Password"
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
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
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
