import { createHomeStyles } from '@/assets/styles/home.styles';
import useTheme from '@/hooks/useTheme';
import { useTodos } from '@/hooks/useTodos';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import { Animated, Text, View } from 'react-native';

export default function Header() {
  const { todos } = useTodos();
  
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);

  const completedCount = todos?.filter((t) => t.isCompleted).length || 0;
  const totalCount = todos?.length || 0;

  const progress = totalCount? (completedCount / totalCount) * 100 : 100;

  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: progress,
      duration: 600,
      useNativeDriver: false
    }).start()
  }, [progress])

  const widthInterpolated = animatedWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%']
  })

  return (
    <View style={homeStyles.header}>
      <View style={homeStyles.titleContainer}>
        <LinearGradient colors={colors.gradients.primary} style={homeStyles.iconContainer}>
          <Ionicons name='flash-outline' size={28} color="#fff" />
        </LinearGradient>

        <View style={homeStyles.titleTextContainer}>
          <Text style={homeStyles.title}> Today&apos;s Tasks 👀</Text>
          
          <Text style={homeStyles.subtitle}>
            {completedCount} of {totalCount} completed
          </Text>
        </View>
      </View>
      
      <View style={homeStyles.progressContainer}>
        <View style={homeStyles.progressBarContainer}>
          <View style={homeStyles.progressBar}>

            <Animated.View style={[homeStyles.progressFill, { width: widthInterpolated }]} >
              <LinearGradient colors={colors.gradients.success} style={[homeStyles.progressFill, { width: `100%` }]} />
            </Animated.View>

          </View>

          <Text style={homeStyles.progressText}>{Math.round(progress)}%</Text>
        </View>
      </View>
    </View>
  )
}