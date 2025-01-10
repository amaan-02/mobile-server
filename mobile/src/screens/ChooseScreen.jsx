import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import {
  FlatList,
  ScrollView,
  View,
  StyleSheet,
  Image,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChooseScreen() {
  const navigation = useNavigation();


  const handleSignUp = () => {
    navigation.navigate('Register'); // Navigate to SignUp screen
  };

  const handleSignIn = () => {
    navigation.navigate('Login'); // Navigate to SignIn screen
  };

  return (
    <SafeAreaView className="flex-1 flex-col px-2 py-8 mx-auto w-full text-lg leading-6 text-center bg-white font-barlow">
      <Image
        src="/Users/aman/Downloads/assesment-app/mobile/assets/7140416_3487927.jpg"
        alt="alt"
        className="self-center w-auto h-60 aspect-square "
      />
      <View className="self-center mt-8 text-base leading-5 text-gray-500">
        <Text className=" font-barlow text-base text-gray-400">You Can Enter Sign in and Start with notes application.</Text>
      </View>
      <View className="px-3 mt-[80%]">
        <TouchableOpacity className="justify-center items-center px-16 py-3  font-barlow font-semibold text-white bg-teal-700 rounded-xl"
          onPress={handleSignUp}>
          <Text className="font-barlow text-white font-medium">Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="justify-center items-center px-16 py-3 mt-4 font-medium rounded-xl bg-gray-200 text-stone-950"
          onPress={handleSignIn}
        >
          <Text>Sign In</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}