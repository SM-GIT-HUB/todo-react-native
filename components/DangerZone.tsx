import { createSettingsStyles } from '@/assets/styles/settings.styles';
import useTheme from '@/hooks/useTheme';
import { useTodos } from '@/hooks/useTodos';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import AlertModal from './AlertModal';

const confirmLabel = "Confirm";
const okLabel = "Alright!";
const cancelLabel = "Cancel";
const subTitleText = "Are you sure about this? This will remove all todos";

export default function DangerZone() {
  const { colors } = useTheme();
  const { deleteAllTodos, todos } = useTodos();
  const settingsStyles = createSettingsStyles(colors);
  
  const [subTitle, setSubTitle] = useState(subTitleText);
  const [truthyText, setTruthyText] = useState(confirmLabel);
  const [falsyText, setFalsyText] = useState<string | undefined>(cancelLabel);

  const [isActive, setIsActive] = useState(false);

  function resetApp()
  {
    const count = todos.length;
    setSubTitle(`App reset successful\nDeleted ${count} todo${count > 1? "s" : ""}`);

    deleteAllTodos();

    setTruthyText(okLabel);
    setFalsyText(undefined);
  }

  function afterReset()
  {
    setIsActive(false);
    setSubTitle(subTitleText);
    setTruthyText(confirmLabel);
    setFalsyText(cancelLabel);
  }

  return (
    <LinearGradient colors={colors.gradients.surface} style={settingsStyles.section}>
      <Text style={settingsStyles.sectionTitleDanger}>Danger Zone</Text>

      <TouchableOpacity style={[settingsStyles.actionButton, { borderBottomWidth: 0 }]} onPress={() => setIsActive(true)} activeOpacity={0.7} >
        <View style={settingsStyles.actionLeft}>
          <LinearGradient colors={colors.gradients.danger} style={settingsStyles.actionIcon}>
            <Ionicons name='trash' size={18} color="#ffffff" />
          </LinearGradient>

          <Text style={settingsStyles.actionTextDanger}>Reset app</Text>
        </View>

        <Ionicons name='chevron-forward' size={18} color={colors.textMuted} />
      </TouchableOpacity>
      
      <AlertModal isActive={isActive} setIsActive={setIsActive} title='Reset App' subTitle={subTitle}
      falsyText={falsyText} truthyText={truthyText} runOnSubmit={falsyText? resetApp : afterReset} />
    </LinearGradient>
  )
}