import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BackArrowComponent({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.backButtonContainer}>
      <View style={styles.backButton}>
        {/* <Ionicons name="arrow-back-outline" size={24} color="white" /> */}
        <Ionicons name="ios-arrow" md="md-arrow" size={24} color="white"></Ionicons>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    backButtonContainer: {
      padding: 10,
    },
    backButton: {
      backgroundColor: 'black', 
      borderRadius: 10, 
      padding: 5, 
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  