import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { useMutation, useQuery } from "convex/react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const todos = useQuery(api.todos.getTodos);
  console.log(todos, "here");

  const addTodo = useMutation(api.todos.addTodo);
  const clearTodos = useMutation(api.todos.deleteAll);
  const updateTodo = useMutation(api.todos.updateTodo);

  function execute()
  {
    toggleDarkMode();
    if (todos?.length) {
      clearTodos();
    }
    else
      addTodo({ text: "This is new todo" });

    // if (todos?.length)
    // {
    //   updateTodo({
    //     id: todos[0]._id,
    //     text: !isDarkMode? "Hey this is todo" : "This is new todo"
    //   })
    // }
  }

  return (
    <View style={styles.container}>
      <Text>Hello World!</Text>

      <TouchableOpacity style={styles.btn} onPress={execute}>
        <Text>Switch Theme and Manipulate todos</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "white"
  },
  btn: {
    height: 50,
    width: 150,
    borderColor: "blue",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    borderRadius: 5
  }
})