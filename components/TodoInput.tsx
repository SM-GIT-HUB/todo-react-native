import { createHomeStyles } from '@/assets/styles/home.styles';
import { api } from '@/convex/_generated/api';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useMutation } from 'convex/react';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Alert, TextInput, TouchableOpacity, View } from 'react-native';

export default function TodoInput() {
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);

  const [newTodo, setNewTodo] = useState("");
  const addTodo = useMutation(api.todos.addTodo);

  async function handleSubmit()
  {
    if (newTodo.trim())
    {
      try {
        await addTodo({ text: newTodo });
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