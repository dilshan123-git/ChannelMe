import React from "react";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

interface CustomerHeaderProps {
  onProfilePress?: () => void;
}

export default function CustomerHeader({
  onProfilePress,
}: CustomerHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Ionicons
            name="medical"
            size={28}
            color="#ffffff"
          />
        </View>

        <View>
          <Text style={styles.logoText}>
            Channel
            <Text style={styles.logoBlue}>Me</Text>
          </Text>

          <Text style={styles.logoSubtitle}>
            Your Health, Our Priority
          </Text>
        </View>
      </View>

      <View style={styles.headerActions}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons
            name="notifications-outline"
            size={25}
            color="#12366B"
          />

          <View style={styles.notificationDot} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.profileCircle}
          onPress={onProfilePress}
          activeOpacity={0.8}
        >
          <Ionicons
            name="person"
            size={23}
            color="#12366B"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  logoCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#12366B",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  logoText: {
    fontSize: 27,
    fontWeight: "800",
    color: "#12366B",
  },

  logoBlue: {
    color: "#12366B",
  },

  logoSubtitle: {
    fontSize: 12,
    color: "#54749b",
    marginTop: 1,
  },

  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  iconButton: {
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },

  notificationDot: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ef4444",
  },

  profileCircle: {
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: "#e7f1fc",
    alignItems: "center",
    justifyContent: "center",
  },
});
