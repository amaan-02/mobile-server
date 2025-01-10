import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Dimensions,
  PixelRatio,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { CountryPicker } from 'react-native-country-codes-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts, Barlow_400Regular, Barlow_600SemiBold } from '@expo-google-fonts/barlow';




const RegisterScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [countryCode, setCountryCode] = useState('+94');
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const handleSelectProfilePicture = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to make this work!');
      return;
    }
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log('ImagePicker Error:', error);
    }
  };

  // Calculate responsive font size based on the device width
  const windowWidth = Dimensions.get('window').width;
  const responsiveFontSize = (size) => {
    const baseWidth = 375; // Base width for responsive calculations
    const scale = windowWidth / baseWidth;
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  };

  // Load Barlow font
  const [fontsLoaded] = useFonts({
    Barlow_400Regular,
    Barlow_600SemiBold,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0F8275" />;
  }

  // Function to handle sign up
  const handleSignUp = async () => {
    // Basic email validation
    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    // Basic password validation
    if (password.length < 6 || !/[!@#$%^&*(),.?":{}|<>_]/.test(password)) {
      Alert.alert('Error', 'Password must be at least 6 characters and include special characters.');
      return;
    }

    const user = {
      name: fullName,
      email,
      phone: mobileNo,
      password,
      profileImage, // Make sure profileImage is included
    };

    try {
      setIsLoading(true);
      const response = await fetch('http://192.168.8.159:5000/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (data.message) {
        await AsyncStorage.setItem('user', JSON.stringify({ name: fullName, email, profileImage, phone: mobileNo }));
        Alert.alert('Registration Successful', 'You have been registered successfully');
        navigation.navigate('Login');
      } else {
        Alert.alert('Registration Failed', data.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Registration Failed', 'An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = () => {
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: 'white' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', paddingHorizontal: 20, paddingTop: 20 }}>
        <View style={{ marginTop: 8, marginBottom: 12 }}>
          <Text style={{ fontSize: responsiveFontSize(24), fontWeight: 'bold', textAlign: 'center', color: '#0F8275', fontFamily: 'Barlow_600SemiBold' }}>
            Create An Account
          </Text>
        </View>

        <TouchableOpacity onPress={handleSelectProfilePicture} style={{ marginBottom: 15 }}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={{ width: 100, height: 100, borderRadius: 50 }} />
          ) : (
            <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: '#E2E8F0', justifyContent: 'center', alignItems: 'center' }}>
              <Icon name="camera-outline" size={40} color="#A0AEC0" />
            </View>
          )}
        </TouchableOpacity>

        <View style={{ width: '100%', marginBottom: 15 }}>
          <Text style={{ marginBottom: 5, fontSize: responsiveFontSize(14), color: '#6B7280', fontFamily: 'Barlow_400Regular' }}>Full Name</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', height: 47, backgroundColor: 'white', borderRadius: 10, shadowColor: 'gray', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.3, shadowRadius: 2, borderWidth: 1, borderColor: '#E2E8F0', paddingHorizontal: 10 }}>
            <Icon name="person-outline" size={20} color="#A0AEC0" style={{ paddingHorizontal: 10 }} />
            <TextInput
              style={{ flex: 1, height: '100%', fontSize: responsiveFontSize(14), color: '#2D3748', fontFamily: 'Barlow_400Regular' }}
              placeholder="Enter your full name"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>
        </View>

        <View style={{ width: '100%', marginBottom: 15 }}>
          <Text style={{ marginBottom: 5, fontSize: responsiveFontSize(14), color: '#6B7280', fontFamily: 'Barlow_400Regular' }}>Email</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', height: 47, backgroundColor: 'white', borderRadius: 10, shadowColor: 'gray', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.3, shadowRadius: 2, borderWidth: 1, borderColor: '#E2E8F0', paddingHorizontal: 10 }}>
            <Icon name="mail-outline" size={20} color="#A0AEC0" style={{ paddingHorizontal: 10 }} />
            <TextInput
              style={{ flex: 1, height: '100%', fontSize: responsiveFontSize(14), color: '#2D3748', fontFamily: 'Barlow_400Regular', }}
              placeholder="Enter your email"
              keyboardType="email-address"
              value={email}
              autoCapitalize='none'
              onChangeText={setEmail}
            />
          </View>
        </View>

        <View style={{ width: '100%', marginBottom: 15 }}>
          <Text style={{ marginBottom: 5, fontSize: responsiveFontSize(14), color: '#6B7280', fontFamily: 'Barlow_400Regular' }}>Phone Number</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', height: 47, backgroundColor: 'white', borderRadius: 10, shadowColor: 'gray', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.3, shadowRadius: 2, borderWidth: 1, borderColor: '#E2E8F0', paddingHorizontal: 10 }}>
            <TouchableOpacity
              onPress={() => setShowCountryPicker(true)}
              style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, height: '100%' }}
            >
              <Text>{countryCode}</Text>
            </TouchableOpacity>
            <View style={{ width: 1, height: '100%', backgroundColor: '#E2E8F0' }} />
            <TextInput
              style={{ flex: 1, height: '100%', fontSize: responsiveFontSize(14), marginLeft: 5 , color: '#2D3748', fontFamily: 'Barlow_400Regular' }}
              keyboardType="phone-pad"
              value={mobileNo}
              onChangeText={setMobileNo}
              placeholder="Enter your phone number"
            />
          </View>
        </View>

        <View style={{ width: '100%', marginBottom: 15 }}>
          <Text style={{ marginBottom: 5, fontSize: responsiveFontSize(14), color: '#6B7280', fontFamily: 'Barlow_400Regular' }}>Password</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', height: 47, backgroundColor: 'white', borderRadius: 10, shadowColor: 'gray', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.3, shadowRadius: 2, borderWidth: 1, borderColor: '#E2E8F0', paddingHorizontal: 10 }}>
            <Icon name="lock-closed-outline" size={20} color="#A0AEC0" style={{ paddingHorizontal: 10 }} />
            <TextInput
              style={{ flex: 1, height: '100%', fontSize: responsiveFontSize(14), color: '#2D3748', fontFamily: 'Barlow_400Regular' }}
              secureTextEntry
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
            />
          </View>
        </View>

        <View style={{ width: '100%', marginBottom: 25 }}>
          <Text style={{ marginBottom: 5, fontSize: responsiveFontSize(14), color: '#6B7280', fontFamily: 'Barlow_400Regular' }}>Confirm Password</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', height: 47, backgroundColor: 'white', borderRadius: 10, shadowColor: 'gray', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.3, shadowRadius: 2, borderWidth: 1, borderColor: '#E2E8F0', paddingHorizontal: 10 }}>
            <Icon name="lock-closed-outline" size={20} color="#A0AEC0" style={{ paddingHorizontal: 10 }} />
            <TextInput
              style={{ flex: 1, height: '100%', fontSize: responsiveFontSize(14), color: '#2D3748', fontFamily: 'Barlow_400Regular' }}
              secureTextEntry
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>
        </View>

        <View style={{ width: '100%' }}>
          <TouchableOpacity onPress={handleSignUp} style={{ backgroundColor: '#0F8275', height: 47, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={{ fontSize: responsiveFontSize(14), color: 'white', fontFamily: 'Barlow_600SemiBold' }}>Sign Up</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSignIn} style={{ height: 47, borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#0F8275' }}>
            <Text style={{ fontSize: responsiveFontSize(14), color: '#0F8275', fontFamily: 'Barlow_600SemiBold' }}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {showCountryPicker && (
        <CountryPicker
          onSelect={(country) => {
            setCountryCode(`+${country.callingCode}`);
            setShowCountryPicker(false);
          }}
          onClose={() => setShowCountryPicker(false)}
          placeholder="Search..."
          searchPlaceholder="Search..."
          // closeButtonImage={require('../assets/images/close.png')}
          modalContainer={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
