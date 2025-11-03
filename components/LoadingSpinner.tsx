import { createHomeStyles } from '@/assets/styles/home.styles';
import useTheme from '@/hooks/useTheme';
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

export default function LoadingSpinner() {
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);

  return (
    <View style={homeStyles.loadingContainer}>
      <ActivityIndicator size='large' color={colors.primary} />
      <Text style={homeStyles.loadingText}>Loading your todos...</Text>
    </View>
  )
}