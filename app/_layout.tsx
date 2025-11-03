import { ThemeProvider } from "@/hooks/useTheme";
import { TodosProvider } from "@/hooks/useTodos";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <TodosProvider>
        <ThemeProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
          </Stack>
        </ThemeProvider>
    </TodosProvider>
  )
}
