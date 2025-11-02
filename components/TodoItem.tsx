import { HomeStylesType } from '@/assets/styles/home.styles';
import { api } from '@/convex/_generated/api';
import { Doc, Id } from '@/convex/_generated/dataModel';
import { ColorScheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useMutation } from 'convex/react';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

type TodoType = Doc<"todos">;

interface TodoItemProps {
  item: TodoType;
  setIsActive: (v: boolean) => void;
  setDeleteId: (v: Id<"todos"> | null) => void;
  homeStyles: HomeStylesType;
  colors: ColorScheme;
  editText: string;
  setEditText: (v: string) => void;
  editingId: Id<"todos"> | null;
  setEditingId: (v: Id<"todos"> | null) => void;
  toogleTodo: ReturnType<typeof useMutation<typeof api.todos.toogleTodo>>;
  updateTodo: ReturnType<typeof useMutation<typeof api.todos.updateTodo>>;
}

export default function TodoItem(Obj: TodoItemProps) {
  function handleDelete()
  {
    Obj.setDeleteId(Obj.item._id);
    Obj.setIsActive(true);
  }

  function handleEdit()
  {
    Obj.setEditingId(Obj.item._id);
    Obj.setEditText(Obj.item.text);
  }

  function handleCancel()
  {
    Obj.setEditText("");
    Obj.setEditingId(null);
  }

  async function handleSave()
  {
    await Obj.updateTodo({ id: Obj.item._id, text: Obj.editText });
    handleCancel();
  }

  return (
    <View style={Obj.homeStyles.todoItemWrapper}>
      <LinearGradient colors={Obj.colors.gradients.surface} style={Obj.homeStyles.todoItem} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} >
        <TouchableOpacity style={Obj.homeStyles.checkbox} activeOpacity={0.7} onPress={() => Obj.toogleTodo({ id: Obj.item._id })} >
          <LinearGradient colors={Obj.item.isCompleted? Obj.colors.gradients.success : Obj.colors.gradients.muted}
          style={[Obj.homeStyles.checkboxInner, { borderColor: Obj.item.isCompleted? "transparent" : Obj.colors.border }]} >
            {
              Obj.item.isCompleted && <Ionicons name="checkmark" size={18} color="#fff" />
            }
          </LinearGradient>
        </TouchableOpacity>

        {
          Obj.editingId == Obj.item._id? (
            <View style={Obj.homeStyles.editContainer}>
              <TextInput style={Obj.homeStyles.editInput} value={Obj.editText} onChangeText={Obj.setEditText}
              multiline placeholder='Edit your todo' placeholderTextColor={Obj.colors.textMuted} />

              <View style={Obj.homeStyles.editButtons}>
                <TouchableOpacity onPress={handleSave} activeOpacity={0.8}>
                  <LinearGradient colors={Obj.colors.gradients.success} style={Obj.homeStyles.editButton}>
                    <Ionicons name='checkmark' size={16} color="#fff" />
                    <Text style={Obj.homeStyles.editButtonText}>Save</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleCancel} activeOpacity={0.8}>
                  <LinearGradient colors={Obj.colors.gradients.muted} style={Obj.homeStyles.editButton}>
                    <Ionicons name='close' size={16} color="#fff" />
                    <Text style={Obj.homeStyles.editButtonText}>Cancel</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={Obj.homeStyles.todoTextContainer}>
              <Text style={[Obj.homeStyles.todoText, Obj.item.isCompleted && { textDecorationLine: "line-through", color: Obj.colors.textMuted, opacity: 0.6 }]}>
                {Obj.item.text}
              </Text>

              <View style={Obj.homeStyles.todoActions}>
                <TouchableOpacity activeOpacity={0.8} onPress={handleEdit} >
                  <LinearGradient colors={Obj.colors.gradients.warning} style={Obj.homeStyles.actionButton}>
                    <Ionicons name="pencil" size={14} color="#fff" />
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.8} onPress={handleDelete} >
                  <LinearGradient colors={Obj.colors.gradients.danger} style={Obj.homeStyles.actionButton}>
                    <Ionicons name="trash" size={14} color="#fff" />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          )
        }
      </LinearGradient>
    </View>
  )
}