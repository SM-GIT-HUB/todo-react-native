import { createHomeStyles } from "@/assets/styles/home.styles";
import Header from "@/components/Header";
import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { colors, toggleDarkMode } = useTheme();
  const todos = useQuery(api.todos.getTodos);

  const homeStyles = createHomeStyles(colors);

  return (
    <LinearGradient colors={colors.gradients.background} style={homeStyles.container}>
      <StatusBar style={colors.statusBarStyle == "dark-content"? "dark" : "light"} hidden={false} />

      <SafeAreaView style={homeStyles.safeArea}>
        
        <Header/>

        <TouchableOpacity onPress={toggleDarkMode}>
          <Text>Switch theme</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  )
}