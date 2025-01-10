// screens/LogoutScreen.js

import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogoutScreen = ({ navigation }) => {

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      console.log('User logged out successfully');
      navigation.replace('Login'); // Navigate back to Login screen
    } catch (e) {
      console.error('Error logging out:', e);
    }
  };

  // Trigger logout process
  React.useEffect(() => {
    handleLogout();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Logging out...</Text>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LogoutScreen;
