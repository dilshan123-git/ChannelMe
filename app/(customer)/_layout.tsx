import {
  Stack,
  Redirect,
} from "expo-router";

import {
  ActivityIndicator,
  View,
} from "react-native";

import {
  useAuth,
} from "../../context/AuthContext";

export default function CustomerLayout() {
  const {
    user,
    loading,
  } = useAuth();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!user) {
    return (
      <Redirect href="/(auth)/login" />
    );
  }

  return (
    <Stack>
      <Stack.Screen
        name="home"
        options={{
          title: "Clinic",
        }}
      />

      <Stack.Screen
        name="appointments"
        options={{
          title: "My Appointments",
        }}
      />
    </Stack>
  );
}