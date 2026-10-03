import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface CommonTextBoxProps extends TextInputProps {
  label?: string;
  error?: string;
}

export default function CommonTextBox({
  label,
  error,
  ...props
}: CommonTextBoxProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TextInput
        style={[
          styles.input,
          error && styles.errorInput,
        ]}
        placeholderTextColor="#999999"
        {...props}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
  },

  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
    color: "#333333",
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    paddingHorizontal: 14,
    fontSize: 16,
    color: "#222222",
    backgroundColor: "#FFFFFF",
  },

  errorInput: {
    borderColor: "#D32F2F",
  },

  errorText: {
    marginTop: 4,
    fontSize: 12,
    color: "#D32F2F",
  },
});