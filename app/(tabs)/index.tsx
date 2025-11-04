import { createHomeStyles } from "@/assets/styles/home.styles";
import DeleteAlert from "@/components/DeleteAlert";
import EmptyState from "@/components/EmptyState";
import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import TodoInput from "@/components/TodoInput";
import TodoItem from "@/components/TodoItem";
import useTheme from "@/hooks/useTheme";
import { useTodos } from "@/hooks/useTodos";
import { TodoType } from "@/lib/database";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);

  const { isLoading, todos } = useTodos();
  
  const [isActive, setIsActive] = useState(false);
  const [deleteId, setDeletdId] = useState<number | null>(null);

  const [editText, setEditText] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  
  function renderTodoItem({ item } : { item: TodoType })
  {
    return (
      <TodoItem item={item} setIsActive={setIsActive} setDeleteId={setDeletdId} colors={colors} homeStyles={homeStyles} editText={editText}
      setEditText={setEditText} editingId={editingId} setEditingId={setEditingId} />
    )
  }

  return (
    <LinearGradient colors={colors.gradients.background} style={homeStyles.container}>
      <StatusBar style={colors.statusBarStyle == "dark-content"? "dark" : "light"} hidden={false} />

      <SafeAreaView style={homeStyles.safeArea}>
        <Header/>
        <TodoInput/>

        {
          isLoading? <LoadingSpinner/> :
          <FlatList data={todos} renderItem={renderTodoItem} keyExtractor={(item) => item.id.toString()} style={homeStyles.todoList}
          contentContainerStyle={homeStyles.todoListContent} ListEmptyComponent={<EmptyState/>} showsVerticalScrollIndicator={false} />
        }
      </SafeAreaView>

      <DeleteAlert id={deleteId} isActive={isActive} setIsActive={setIsActive} setDeleteId={setDeletdId} />
    </LinearGradient>
  )
}