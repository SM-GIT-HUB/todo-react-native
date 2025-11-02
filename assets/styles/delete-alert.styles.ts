import { ColorScheme } from "@/hooks/useTheme";
import { StyleSheet } from "react-native";

export const createDeleteAlertStyles = (colors: ColorScheme) => {
  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    container: {
      width: 300,
      borderRadius: 10,
      padding: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 8,
    },
    title: {
      fontSize: 22,
      fontWeight: "700",
      letterSpacing: -1,
      marginBottom: 10,
      textAlign: "center",
      color: colors.text,
    },
    subtitle: {
      fontSize: 17,
      fontWeight: "500",
      textAlign: "center",
      marginBottom: 20,
      color: colors.textMuted,
    },
    actions: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 50,
    },
    button: {
      paddingHorizontal: 20,
      paddingVertical: 8,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonText: {
      color: "#ffffff",
      fontWeight: "600",
      fontSize: 15,
    },
  });

  return styles;
}