import { createHomeStyles } from "@/assets/styles/home.styles";
import EmptyState from "@/components/EmptyState";
import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import TodoInput from "@/components/TodoInput";
import TodoItem from "@/components/TodoItem";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import useTheme from "@/hooks/useTheme";
import { useMutation, useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { FlatList, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type TodoType = Doc<"todos">;

export default function Index() {
  const { colors, toggleDarkMode } = useTheme();
  const homeStyles = createHomeStyles(colors);
  
  let todos = useQuery(api.todos.getTodos);
  const toogleTodo = useMutation(api.todos.toogleTodo);
  const isLoading = (todos == undefined);

  // if (isLoading) {
  //   return (
  //     <LoadingSpinner/>
  //   )
  // }

  function renderTodoItem({ item } : { item: TodoType })
  {
    return (
      <TodoItem item={item} />
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
          <FlatList data={todos} renderItem={renderTodoItem} keyExtractor={(item) => item._id} style={homeStyles.todoList}
          contentContainerStyle={homeStyles.todoListContent} ListEmptyComponent={<EmptyState/>} showsVerticalScrollIndicator={false} />
        }

        <TouchableOpacity onPress={toggleDarkMode}>
          <Text>Switch theme</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  )
}