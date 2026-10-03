import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import {
  router,
} from "expo-router";

import {
  useAuth,
} from "../../context/AuthContext";

export default function CustomerHome() {
  const {
    user,
    logout,
  } = useAuth();

  const handleLogout = async () => {
    await logout();

    router.replace(
      "/(auth)/login"
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Hello, {user?.name}
      </Text>

      <Text style={styles.subtitle}>
        Welcome to the Clinic Appointment System
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push(
            "/(customer)/appointments"
          )
        }
      >
        <Text style={styles.buttonText}>
          My Appointments
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#f5f7fb",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },

  button: {
    height: 52,
    backgroundColor: "#2563eb",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  logoutButton: {
    height: 52,
    borderWidth: 1,
    borderColor: "#dc2626",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  logoutText: {
    color: "#dc2626",
    fontSize: 16,
    fontWeight: "600",
  },
});