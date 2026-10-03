import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  Pressable,
} from "react-native";

import { router } from "expo-router";

import CommonTextBox from "../components/CommonTextBox";
import CommonButton from "../components/CommonButton";

export default function Login() {
  const handleLogin = () => {
    console.log("Login");
  };

  const handleForgotPassword = () => {
    router.push("/(auth)/forgot-password");
  };

  const handleRegister = () => {
    router.push("/(auth)/register");
  };

  return (
    <ImageBackground
      source={require("../assets/images/login-bg.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.form}>

          {/* Title */}
          <Text style={styles.title}>
            WELCOME BACK
          </Text>

          {/* Email */}
          <CommonTextBox
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Password */}
          <CommonTextBox
            label="Password"
            placeholder="Enter your password"
            secureTextEntry
          />

          {/* Forgot Password */}
          <Pressable
            onPress={handleForgotPassword}
            style={styles.forgotContainer}
          >
            <Text style={styles.forgotText}>
              Forgot Password?
            </Text>
          </Pressable>

          {/* Login */}
          <CommonButton
            title="Login"
            onPress={handleLogin}
          />

          {/* Register */}
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>
              Don't have an account?
            </Text>

            <Pressable onPress={handleRegister}>
              <Text style={styles.registerLink}>
                Register
              </Text>
            </Pressable>
          </View>

        </View>
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

  form: {
    width: "100%",
    maxWidth: 400,
    padding: 25,
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
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