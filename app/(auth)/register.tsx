import React, {
  useState,
} from "react";

import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
} from "react-native";

import { router } from "expo-router";

import { useAuth } from "../../context/AuthContext";

import CommonTextBox from "../components/CommonTextBox";
import CommonButton from "../components/CommonButton";


export default function RegisterScreen() {
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!name.trim()) {
      setError("Name is required");
      return false;
    }

    if (name.trim().length < 2) {
      setError(
        "Name must contain at least 2 characters"
      );
      return false;
    }

    if (!email.trim()) {
      setError("Email address is required");
      return false;
    }

    if (!email.includes("@")) {
      setError(
        "Please enter a valid email address"
      );
      return false;
    }

    if (!password) {
      setError("Password is required");
      return false;
    }

    if (password.length < 6) {
      setError(
        "Password must contain at least 6 characters"
      );
      return false;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    setError("");

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      await register({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      router.replace(
        "/(customer)/home"
      );
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Registration failed. Please try again.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/login-bg.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>

        <KeyboardAvoidingView
          style={styles.container}
          behavior={
            Platform.OS === "ios"
              ? "padding"
              : undefined
          }
        >
          <ScrollView
            contentContainerStyle={
              styles.scrollContent
            }
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.card}>

              {/* Title */}
              <Text style={styles.title}>
                Create Account
              </Text>

              {/* Subtitle */}
              <Text style={styles.subtitle}>
                Register as a clinic customer
              </Text>

              {/* Error */}
              {error ? (
                <View style={styles.errorBox}>
                  <Text style={styles.errorText}>
                    {error}
                  </Text>
                </View>
              ) : null}

              {/* Full Name */}
              <CommonTextBox
                label="Full Name"
                placeholder="Enter your full name"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />

              {/* Email */}
              <CommonTextBox
                label="Email"
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />

              {/* Password */}
              <CommonTextBox
                label="Password"
                placeholder="Create a password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />

              {/* Confirm Password */}
              <CommonTextBox
                label="Confirm Password"
                placeholder="Confirm your password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={
                  setConfirmPassword
                }
              />

              {/* Register Button */}
              <CommonButton
                title="Create Account"
                onPress={handleRegister}
                loading={loading}
              />

              {/* Login Link */}
              <View style={styles.loginRow}>
                <Text style={styles.loginText}>
                  Already have an account?
                </Text>

                <Pressable
                  onPress={() =>
                    router.push(
                      "/(auth)/login"
                    )
                  }
                >
                  <Text style={styles.link}>
                    {" "}Login
                  </Text>
                </Pressable>
              </View>

            </View>
          </ScrollView>
        </KeyboardAvoidingView>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
  },

  container: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },

  card: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",

    backgroundColor: "rgba(255, 255, 255, 0.95)",

    padding: 24,
    borderRadius: 16,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },

  subtitle: {
    color: "#666",
    marginBottom: 24,
    textAlign: "center",
  },

  errorBox: {
    backgroundColor: "#fee2e2",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },

  errorText: {
    color: "#b91c1c",
  },

  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  loginText: {
    fontSize: 14,
  },

  link: {
    color: "#080808",
    fontWeight: "600",
    fontSize: 14,
  },
});