// import React, { useEffect, useState } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // Screens
// import LoginScreen from '../screens/LoginScreen';
// import RegisterScreen from '../screens/RegisterScreen';
// import MainTabNavigator from './MainTabNavigator';
// import AddTaskScreen from '../screens/AddTaskScreen';
// import EditTaskScreen from '../screens/EditTaskScreen';
// import EditProfileScreen from '../screens/EditProfileScreen';
// import WelcomeScreen from '../screens/WelcomeScreen';
// import PlatformSpecificIcon from '../components/headers/PlatformSpecificIcon';

// const Stack = createStackNavigator();

// const AppNavigator = () => {
//   const [initializing, setInitializing] = useState(true);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [showWelcomeScreen, setShowWelcomeScreen] = useState(false);

//   // Function to check if the user is logged in based on token presence
//   const checkUserLoggedIn = async () => {
//     let token = null;
//     try {
//       token = await AsyncStorage.getItem('userToken');
//     } catch (error) {
//       console.error('Error retrieving user token from AsyncStorage:', error);
//     }

//     if (token) {
//       setIsLoggedIn(true); // User is considered logged in if token exists
//       setShowWelcomeScreen(false); // No need to show Welcome Screen for returning user
//     } else {
//       setIsLoggedIn(false); // No token found, user is not logged in
//       setShowWelcomeScreen(true); // Show Welcome Screen for new user
//     }

//     setInitializing(false); // Initialization complete
//   };

//   useEffect(() => {
//     checkUserLoggedIn(); // Check login status on component mount
//   }, []);

//   if (initializing) {
//     // Show loading indicator while initializing
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#0F8275" />
//       </View>
//     );
//   }

//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName={showWelcomeScreen ? 'WelcomeScreen' : (isLoggedIn ? 'MainTabNavigator' : 'Login')}>
//         <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
//         <Stack.Screen
//           name="Login"
//           component={LoginScreen}
//           options={({ navigation }) => ({
//             headerLeft: () => (
//               <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonContainer}>
//                 <View style={styles.backButton}>
//                   <PlatformSpecificIcon iosName="chevron-back" mdName="arrow-back-outline" size={22} color="white" />
//                 </View>
//               </TouchableOpacity>
//             ),
//             headerStyle: styles.headerStyle,
//             headerTitle: '',
//           })}
//         />
//         <Stack.Screen
//           name="Register"
//           component={RegisterScreen}
//           options={({ navigation }) => ({
//             headerLeft: () => (
//               <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonContainer}>
//                 <View style={styles.backButton}>
//                   <PlatformSpecificIcon iosName="chevron-back" mdName="arrow-back-outline" size={22} color="white" />
//                 </View>
//               </TouchableOpacity>
//             ),
//             headerStyle: styles.headerStyle,
//             headerTitle: '',
//           })}
//         />
//         <Stack.Screen name="MainTabNavigator" component={MainTabNavigator} options={{ headerShown: false }} />
//         <Stack.Screen name="AddTaskScreen" component={AddTaskScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="EditTaskScreen" component={EditTaskScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} options={{ headerShown: false }} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// const styles = StyleSheet.create({
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   backButtonContainer: {
//     marginLeft: 15,
//   },
//   backButton: {
//     paddingHorizontal: 10,
//   },
//   headerStyle: {
//     backgroundColor: '#0F8275',
//   },
// });

// export default AppNavigator;



import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screens
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import MainTabNavigator from './MainTabNavigator';
import AddTaskScreen from '../screens/AddTaskScreen';
import EditTaskScreen from '../screens/EditTaskScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import PlatformSpecificIcon from '../components/headers/PlatformSpecificIcon';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [initializing, setInitializing] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(false);

  // Function to check if the user is logged in based on token presence
  const checkUserLoggedIn = async () => {
    let token = null;
    try {
      token = await AsyncStorage.getItem('userToken');
    } catch (error) {
      console.error('Error retrieving user token from AsyncStorage:', error);
    }

    if (token) {
      setIsLoggedIn(true); // User is considered logged in if token exists
      setShowWelcomeScreen(false); // No need to show Welcome Screen for returning user
    } else {
      setIsLoggedIn(false); // No token found, user is not logged in
      setShowWelcomeScreen(true); // Show Welcome Screen for new user
    }

    setInitializing(false); // Initialization complete
  };

  useEffect(() => {
    checkUserLoggedIn(); // Check login status on component mount
  }, []);

  if (initializing) {
    // Show loading indicator while initializing
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0F8275" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={showWelcomeScreen ? 'WelcomeScreen' : (isLoggedIn ? 'MainTabNavigator' : 'Login')}>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonContainer}>
                <View style={styles.backButton}>
                  <PlatformSpecificIcon iosName="chevron-back" mdName="arrow-back-outline" size={22} color="white" />
                </View>
              </TouchableOpacity>
            ),
            headerStyle: styles.headerStyle,
            headerTitle: '',
          })}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonContainer}>
                <View style={styles.backButton}>
                  <PlatformSpecificIcon iosName="chevron-back" mdName="arrow-back-outline" size={22} color="white" />
                </View>
              </TouchableOpacity>
            ),
            headerStyle: styles.headerStyle,
            headerTitle: '',
          })}
        />
        <Stack.Screen name="MainTabNavigator" component={MainTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="AddTaskScreen" component={AddTaskScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EditTaskScreen" component={EditTaskScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonContainer: {
    marginLeft: 15,
  },
  backButton: {
    paddingHorizontal: 10,
  },
  headerStyle: {
    backgroundColor: '#0F8275',
  },
});

export default AppNavigator;
