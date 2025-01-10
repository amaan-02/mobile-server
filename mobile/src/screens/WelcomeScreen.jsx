import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import LottieView from 'lottie-react-native'
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="flex-1 flex justify-around my-4 px-[5px]">
        <Text className="text-3xl font-bold text-center text-gray-800 font-barlow">
          Let's Get Started!
        </Text>
        <Text className="text-sm font-barlow text-center text-gray-500  leading-6">
          You Can Enter Sign in and Start with task scheduled application.
        </Text>
        <View className="justify-center items-center mb-4">
          <Image source={require('../../assets/7140416_3487927.jpg')} 
            style={{ height: 350, width: 350 }}>
          </Image>
        </View>
        <View className="space-y-4">
          <TouchableOpacity className="bg-teal-700 py-3 mx-7 rounded-xl">
            <Text className="text-white text-center font-medium"
              onPress={() => navigation.navigate('Register')}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
          <View className="flex-row justify-center">
            <Text className="font-barlow text-[#161616]">Already have an account?</Text>
            <TouchableOpacity>
              <Text
                className="font-barlow font-semibold text-teal-700"
                onPress={() => navigation.navigate('Login')}
              > Log In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}
