import { createSettingsStyles } from '@/assets/styles/settings.styles';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Switch, Text, View } from 'react-native';

export default function Preferences() {
  const [isAutoSync, setIsAutoSync] = useState(true);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);

  const { colors, isDarkMode, toggleDarkMode } = useTheme();

  const settingsStyles = createSettingsStyles(colors);

  return (
    <LinearGradient colors={colors.gradients.surface} style={settingsStyles.section} >
      <Text style={settingsStyles.sectionTitle}>Change your theme?</Text>

      <View style={settingsStyles.settingItem}>
        <View style={settingsStyles.settingLeft}>
          <LinearGradient colors={colors.gradients.primary} style={settingsStyles.settingIcon} >
            <Ionicons name='moon' size={18} color="#fff" />
          </LinearGradient>

          <Text style={settingsStyles.settingText}>Dark Mode</Text>
        </View>
          <Switch value={isDarkMode} onValueChange={toggleDarkMode} thumbColor={isDarkMode? "#fff" : "#a8a8a8ff"} trackColor={{false: colors.border, true: colors.primary}} />
      </View>
    </LinearGradient>
  )
}