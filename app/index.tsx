import { useEffect } from "react";
import { router } from "expo-router";

import { useAuth } from "../context/AuthContext";
import LoadingScreen from "./components/LoadingScreen";

const LOADING_TIME = 2000; // 2 seconds

export default function Index() {
  const {
    user,
    loading,
  } = useAuth();

  useEffect(() => {
    if (loading) {
      return;
    }

    const timer = setTimeout(() => {
      if (user) {
        router.replace("/(customer)/home");
      } else {
        router.replace("/(auth)/login");
      }
    }, LOADING_TIME);

    return () => clearTimeout(timer);
  }, [loading, user]);

  return <LoadingScreen />;
}