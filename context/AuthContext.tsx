import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  loginCustomer,
  registerCustomer,
  LoginData,
  RegisterData,
} from "../services/authService";

import { User } from "../types/auth";

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;

  login: (
    data: LoginData
  ) => Promise<void>;

  register: (
    data: RegisterData
  ) => Promise<void>;

  logout: () => Promise<void>;
}

const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined
  );

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] =
    useState<User | null>(null);

  const [token, setToken] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadStoredAuthentication();
  }, []);

  const loadStoredAuthentication =
    async () => {
      try {
        const storedToken =
          await AsyncStorage.getItem(
            "token"
          );

        const storedUser =
          await AsyncStorage.getItem(
            "user"
          );

        if (
          storedToken &&
          storedUser
        ) {
          setToken(storedToken);

          setUser(
            JSON.parse(storedUser)
          );
        }
      } catch (error) {
        console.log(
          "Failed to load authentication",
          error
        );
      } finally {
        setLoading(false);
      }
    };

  const login = async (
    data: LoginData
  ) => {
    const response =
      await loginCustomer(data);

    const {
      token,
      user,
    } = response.data;

    await AsyncStorage.setItem(
      "token",
      token
    );

    await AsyncStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    setToken(token);
    setUser(user);
  };

  const register = async (
    data: RegisterData
  ) => {
    const response =
      await registerCustomer(data);

    const {
      token,
      user,
    } = response.data;

    await AsyncStorage.setItem(
      "token",
      token
    );

    await AsyncStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    setToken(token);
    setUser(user);
  };

  const logout = async () => {
    await AsyncStorage.removeItem(
      "token"
    );

    await AsyncStorage.removeItem(
      "user"
    );

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};