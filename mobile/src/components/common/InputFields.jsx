import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const InputField = ({ label, secureTextEntry = false, value, onChangeText, error }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const getBorderColor = () => {
    return error ? '#EF4444' : '#E2E8F0'; // Red color for error state, default border color otherwise
  };

  return (
    <View style={[styles.inputContainer, { borderColor: getBorderColor() }]}>
      <View style={styles.iconContainer}>
        {label.toLowerCase() === 'email' && (
          <Icon name="mail-outline" size={20} color="#A0AEC0" />
        )}
        {label.toLowerCase() === 'password' && (
          <Icon name="lock-closed-outline" size={20} color="#A0AEC0" />
        )}
      </View>
      <TextInput
        style={styles.input}
        secureTextEntry={!isPasswordVisible && secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        accessibilityLabel={label}
        placeholderTextColor="#A0AEC0"
        placeholder={`Enter your ${label.toLowerCase()}`}
      />
      {secureTextEntry && (
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
          <Icon
            name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color="#A0AEC0"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    borderWidth: 1,
    height: 46,
    marginBottom: 15,
  },
  iconContainer: {
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#2D3748',
  },
});

export default InputField;
