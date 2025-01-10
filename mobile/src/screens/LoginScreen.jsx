import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputField from '../components/common/InputFields';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  return password.length >= 6;
};

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = async () => {
    setEmailError('');
    setPasswordError('');

    if (email.trim() === '' && password.trim() === '') {
      setEmailError('Email input is empty');
      setPasswordError('Password input is empty');
      return;
    }

    if (email.trim() === '') {
      setEmailError('Email input is empty, please fill it');
      return;
    }

    if (password.trim() === '') {
      setPasswordError('Password input is empty, please fill it');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError('Please enter a valid password.');
      return;
    }

    const user = { email, password };

    try {
      setIsLoading(true);
      const response = await fetch('http://192.168.8.159:5000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('userToken', data.token);
        navigation.replace('MainTabNavigator');
      } else {
        Alert.alert('Error', data.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to connect to the server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', paddingHorizontal: 20 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled
    >
      <View style={{ marginTop: windowHeight * 0.05 }}>
        <Text style={{ fontSize: windowWidth * 0.07, fontWeight: 'bold', color: '#374151' }}>Sign In</Text>
      </View>
      <View style={{ marginTop: windowHeight * 0.02, marginBottom: windowHeight * 0.05, alignItems: 'center' }}>
        <Text style={{ fontSize: windowWidth * 0.035, color: '#6B7280' }}>You can sign-in into account and enjoy task management with application.</Text>
      </View>
      <View style={{ width: '100%', marginBottom: windowHeight * 0.05, paddingTop: windowHeight * 0.02 }}>
        {emailError ? (
          <Text style={{ color: '#EF4444', fontSize: windowWidth * 0.035, marginBottom: windowHeight * 0.02 }}>{emailError}</Text>
        ) : null}
        <InputField
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          error={emailError}
        />
        {passwordError ? (
          <Text style={{ color: '#EF4444', fontSize: windowWidth * 0.035, marginBottom: windowHeight * 0.02 }}>{passwordError}</Text>
        ) : null}
        <InputField
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          error={passwordError}
        />
      </View>
      <TouchableOpacity
        style={{ width: '100%', backgroundColor: '#0F8275', paddingVertical: windowHeight * 0.015, borderRadius: windowWidth * 0.03, alignItems: 'center', position: 'absolute', bottom: windowHeight * 0.1 }}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={{ fontSize: windowWidth * 0.045, fontWeight: 'bold', color: 'white' }}>Login</Text>
        )}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
