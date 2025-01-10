// src/components/PlatformSpecificIcon.js
import React from 'react';
import { Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PlatformSpecificIcon = ({ iosName, mdName, size, color, style }) => {
  const iconName = Platform.OS === 'ios' ? iosName : mdName;
  return <Ionicons name={iconName} size={size} color={color} style={style} />;
};

export default PlatformSpecificIcon;
