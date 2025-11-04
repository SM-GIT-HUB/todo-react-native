import { createSettingsStyles } from '@/assets/styles/settings.styles';
import useTheme from '@/hooks/useTheme';
import { useTodos } from '@/hooks/useTodos';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, View } from 'react-native';

export default function ProgressStats() {
  const { colors } = useTheme();
  const { todos } = useTodos();

  const settingsStyles = createSettingsStyles(colors);
  
  const totalTodos = todos.length;
  const completed = todos.filter((t) => t.isCompleted).length;
  const activeTodos = totalTodos - completed;
  
  return (
    <LinearGradient colors={colors.gradients.surface} style={settingsStyles.section}>
      <Text style={settingsStyles.sectionTitle}>Progress Stats</Text>

      <View style={settingsStyles.statsContainer}>
        <LinearGradient colors={colors.gradients.background} style={[settingsStyles.statCard, { borderLeftColor: colors.primary }]} >
          <View style={settingsStyles.statIconContainer}>
            <LinearGradient  colors={colors.gradients.primary} style={settingsStyles.statIcon} >
              <Ionicons name='list' size={20} color="#fff" />
            </LinearGradient>
          </View>

          <View>
            <Text style={settingsStyles.statNumber}>{totalTodos}</Text>
            <Text style={settingsStyles.statLabel}>Total todos</Text>
          </View>
        </LinearGradient>
        
        <LinearGradient colors={colors.gradients.background} style={[settingsStyles.statCard, { borderLeftColor: colors.success }]} >
          <View style={settingsStyles.statIconContainer}>
            <LinearGradient  colors={colors.gradients.success} style={settingsStyles.statIcon} >
              <Ionicons name='checkmark-circle' size={20} color="#fff" />
            </LinearGradient>
          </View>

          <View>
            <Text style={settingsStyles.statNumber}>{completed}</Text>
            <Text style={settingsStyles.statLabel}>Completed todos</Text>
          </View>
        </LinearGradient>

        <LinearGradient colors={colors.gradients.background} style={[settingsStyles.statCard, { borderLeftColor: colors.warning }]} >
          <View style={settingsStyles.statIconContainer}>
            <LinearGradient  colors={colors.gradients.warning} style={settingsStyles.statIcon} >
              <Ionicons name='time' size={20} color="#fff" />
            </LinearGradient>
          </View>

          <View>
            <Text style={settingsStyles.statNumber}>{activeTodos}</Text>
            <Text style={settingsStyles.statLabel}>Active todos</Text>
          </View>
        </LinearGradient>
      </View>
    </LinearGradient>
  )
}