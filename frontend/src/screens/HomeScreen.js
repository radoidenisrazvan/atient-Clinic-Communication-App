import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeScreen = ({ route }) => {
  const { userType, name } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome, {name}!</Text>
      <Text style={styles.info}>You are logged in as {userType}.</Text>
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
});

export default HomeScreen;
