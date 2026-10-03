import React from "react";

import {
  ActivityIndicator,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function LoadingScreen() {
  return (
    <ImageBackground
      source={require("../assets/images/flash-bg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>

        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Bottom Loading */}
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color="#ffffff"
          />

          <Text style={styles.message}>
            Loading...
          </Text>
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

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    // Move logo slightly upward
    paddingBottom: 80,
  },

  logo: {
    width: 180,
    height: 180,
  },

  loadingContainer: {
    position: "absolute",
    bottom: 50,
    alignItems: "center",
  },

  message: {
    marginTop: 12,
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "500",
  },
});