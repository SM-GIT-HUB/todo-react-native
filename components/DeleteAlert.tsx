import { createDeleteAlertStyles } from '@/assets/styles/delete-alert.styles';
import useTheme from '@/hooks/useTheme';
import { useTodos } from '@/hooks/useTodos';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

interface DeleteAlertProps {
  id: number | null;
  isActive: boolean;
  setIsActive: (v: boolean) => void;
  setDeleteId: (v: number | null) => void;
}

export default function DeleteAlert({ id, isActive, setIsActive, setDeleteId }: DeleteAlertProps) {
  const { colors } = useTheme();
  const { deleteTodo } = useTodos();
  const deleteAlertStyles = createDeleteAlertStyles(colors);
  
  function handleConfirm()
  {
    if (id == null) {
      return;
    }

    deleteTodo({ id });
    setIsActive(false);
    setDeleteId(null);
  }

  return (
    <Modal transparent visible={isActive} animationType="fade">
      <View style={deleteAlertStyles.overlay}>
        <LinearGradient colors={colors.gradients.surface} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={deleteAlertStyles.container} >
          <Text style={deleteAlertStyles.title}>Delete this todo</Text>
          <Text style={deleteAlertStyles.subtitle}>Are you sure about this?</Text>

          <View style={deleteAlertStyles.actions}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => setIsActive(false)}>
              <LinearGradient colors={colors.gradients.warning} style={deleteAlertStyles.button} >
                <Text style={deleteAlertStyles.buttonText}>Cancel</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} onPress={handleConfirm}>
              <LinearGradient colors={colors.gradients.danger} style={deleteAlertStyles.button} >
                <Text style={deleteAlertStyles.buttonText}>Delete</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </Modal>
  )
}