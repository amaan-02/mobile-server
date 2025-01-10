// screens/ProfileScreen.js
import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

const ProfileScreen = ({ navigation }) => {
  const profile = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    profileImage: null, // Add logic to fetch profile image if available
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {profile.profileImage ? (
        <Image source={{ uri: profile.profileImage }} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text>No Image</Text>
        </View>
      )}
      <Text style={styles.text}>Name: {profile.name}</Text>
      <Text style={styles.text}>Email: {profile.email}</Text>
      <Button title="Edit Profile" onPress={() => navigation.navigate('EditProfile')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    alignSelf: 'center',
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },
});

export default ProfileScreen;
