import useTheme from "@/hooks/useTheme";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { toggleDarkMode } = useTheme();

  return (
    <View style={styles.container}>
      <Text>Hello World!</Text>

      <TouchableOpacity style={styles.btn} onPress={toggleDarkMode}>
        <Text>Switch Theme</Text>
      </TouchableOpacity>
    </View>
  );
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