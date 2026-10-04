import React, { useState } from "react";

import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import { router } from "expo-router";

import CommonTextBox from "../components/CommonTextBox";
import CommonButton from "../components/CommonButton";

import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const { loginUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    setError("");

    if (!email.trim()) {
      setError("Email address is required");
      return false;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return false;
    }

    if (!password) {
      setError("Password is required");
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    
    setError("");

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      await loginUser({
        email: email.trim().toLowerCase(),
        password,
      });


      Alert.alert(
        "Login Successful",
        "Welcome back!",
        [
          {
            text: "OK",
            onPress: () => {
              router.replace(
                "../(customer)/home" as any
              );
            },
          },
        ]
      );
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Login failed. Please try again.";

      setError(message);

      Alert.alert(
        "Login Failed",
        message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    router.push(
      "/(auth)/forgot-password" as any
    );
  };

  const handleRegister = () => {
    router.push(
      "/(auth)/register" as any
    );
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
            <View style={styles.form}>
              <Text style={styles.title}>
                WELCOME BACK
              </Text>

              {error ? (
                <View style={styles.errorBox}>
                  <Text style={styles.errorText}>
                    {error}
                  </Text>
                </View>
              ) : null}

              <CommonTextBox
                label="Email"
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />

              <CommonTextBox
                label="Password"
                placeholder="Enter your password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />

              <Pressable
                onPress={handleForgotPassword}
                style={styles.forgotContainer}
              >
                <Text style={styles.forgotText}>
                  Forgot Password?
                </Text>
              </Pressable>

              <CommonButton
                title="Login"
                onPress={handleLogin}
                loading={loading}
              />

              <View
                style={styles.registerContainer}
              >
                <Text style={styles.registerText}>
                  Don't have an account?
                </Text>

                <Pressable
                  onPress={handleRegister}
                >
                  <Text
                    style={styles.registerLink}
                  >
                    Register
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
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
  },

  container: {
    flex: 1,
    width: "100%",
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },

  form: {
    width: "100%",
    maxWidth: 400,
    padding: 25,
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    alignSelf: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
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
    fontSize: 14,
  },

  forgotContainer: {
    alignItems: "flex-end",
    marginTop: -5,
    marginBottom: 15,
  },

  forgotText: {
    fontSize: 14,
    fontWeight: "500",
  },

  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  registerText: {
    fontSize: 14,
  },

  registerLink: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: "bold",
  },
});