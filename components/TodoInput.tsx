import { createHomeStyles } from '@/assets/styles/home.styles';
import useTheme from '@/hooks/useTheme';
import { useTodos } from '@/hooks/useTodos';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Alert, TextInput, TouchableOpacity, View } from 'react-native';

export default function TodoInput() {
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);

  const [newTodo, setNewTodo] = useState("");
  const { addTodo } = useTodos();

  function handleSubmit()
  {
    if (newTodo.trim())
    {
      try {
        addTodo({ text: newTodo });
        setNewTodo("");
      }
      catch(err: any) {
        Alert.alert("Please try again");
        console.log("Error in todoInput handleSubmit: ", err.message);
      }
    }
  }
    
  return (
    <View style={homeStyles.inputSection} >
      <View style={homeStyles.inputWrapper} >
        <TextInput style={homeStyles.input} placeholder='What needs to be done?' value={newTodo}
        onChangeText={setNewTodo} onSubmitEditing={handleSubmit} placeholderTextColor={colors.textMuted}/>

        <TouchableOpacity onPress={handleSubmit} activeOpacity={0.8} disabled={!newTodo.trim()}>
          <LinearGradient colors={newTodo.trim()? colors.gradients.primary : colors.gradients.muted} style={[homeStyles.addButton, !newTodo.trim() && homeStyles.addButtonDisabled]}>
            <Ionicons name='add' size={24} color="#ffffff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  )
}