import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";

interface CommonButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export default function CommonButton({
  title,
  onPress,
  loading = false,
  disabled = false,
}: CommonButtonProps) {
  return (
    <Pressable
      style={[
        styles.button,
        (disabled || loading) && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color="#ffffff" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 8,
    backgroundColor: "#1b1b1c",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  disabled: {
    opacity: 0.6,
  },

  text: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});