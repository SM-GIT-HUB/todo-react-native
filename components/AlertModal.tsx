import { createDeleteAlertStyles } from '@/assets/styles/alert.styles';
import useTheme from '@/hooks/useTheme';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

interface ModalProps{
  isActive: boolean;
  setIsActive: (v: boolean) => void;
  runOnSubmit: () => void;
  title: string;
  subTitle: string;
  falsyText: string | undefined;
  truthyText: string;
}

export default function AlertModal({ isActive, setIsActive, runOnSubmit, title, subTitle, falsyText, truthyText }: ModalProps) {
  const { colors } = useTheme();
  const alertStyles = createDeleteAlertStyles(colors);

  return (
    <Modal transparent visible={isActive} animationType="fade">
      <View style={alertStyles.overlay}>
        <LinearGradient colors={colors.gradients.surface} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={alertStyles.container} >
          <Text style={alertStyles.title}>{title}</Text>
          <Text style={alertStyles.subtitle}>{subTitle}</Text>

          <View style={alertStyles.actions}>
            {
              (falsyText != undefined) &&
              <TouchableOpacity activeOpacity={0.8} onPress={() => setIsActive(false)}>
                <LinearGradient colors={colors.gradients.warning} style={alertStyles.button} >
                  <Text style={alertStyles.buttonText}>{falsyText}</Text>
                </LinearGradient>
              </TouchableOpacity>
            }

            <TouchableOpacity activeOpacity={0.8} onPress={runOnSubmit}>
              <LinearGradient colors={colors.gradients.success} style={alertStyles.button} >
                <Text style={alertStyles.buttonText}>{truthyText}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </Modal>
  )
}