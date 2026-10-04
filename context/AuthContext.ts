import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { User } from "@/types/User";
import { LoginRequest } from "@/types/LoginRequest";
import { RegisterRequest } from "@/types/RegisterRequest";

import {
    loginUser as loginUserService,
    registerUser as registerUserService,
} from "../service/auth/authService";
import { API_CONFIG } from "@/config/IpConfig";
import { router } from "expo-router";
import { CommonResponse } from "@/types/CommonResponse";
import { LoginResponse } from "@/types/LoginResponse";
import { jwtDecode } from "jwt-decode";


interface RequestOptions {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: any;
    token?: string;
}

export const apiRequest = async <T>(
    endpoint: string,
    options: RequestOptions = {}
): Promise<T> => {
    const {
        method = "GET",
        body,
        token,
    } = options;

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(
        `${API_CONFIG.BASE_URL}${endpoint}`,
        {
            method,
            headers,
            body: body
                ? JSON.stringify(body)
                : undefined,
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message || "Something went wrong"
        );
    }

    return result;
};


interface AuthContextType {
    user: User | null;
    token: string | null;
    loading: boolean;

    loginUser: (
        request: LoginRequest
    ) => Promise<void>;

    registerUser: (
        request: RegisterRequest
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
    children: ReactNode;
}) => {
    const [user, setUser] =
        useState<User | null>(null);

    const [token, setToken] =
        useState<string | null>(null);

    const [loading, setLoading] =
        useState(true);


    useEffect(() => {
        loadAuth();
    }, []);

    const loadAuth = async () => {
        try {
            const savedToken =
                await AsyncStorage.getItem("token");

            const savedUser =
                await AsyncStorage.getItem("user");

            if (savedToken) {
                setToken(savedToken);
            }

            if (savedUser) {
                setUser(JSON.parse(savedUser));
            }
        } catch (error) {
            console.error(
                "Failed to load authentication:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    /* =======================================================
       LOGIN
    ======================================================= */

    const loginUser = async (
        request: LoginRequest
    ): Promise<void> => {
        console.log("Start | Login");

        const response: CommonResponse<LoginResponse> =
            await loginUserService(request);

        if (!response.success) {
            throw new Error(response.message || "Login failed");
        }

        if (!response.data) {
            throw new Error("Login data not found");
        }

        const { token } = response.data;
        const decodedUser = jwtDecode<{ user: User }>(token);
        console.log(decodedUser);
        
        const authenticatedUser = decodedUser.user as User;

        console.log("Token:", token);
        console.log("Decoded User:", authenticatedUser);

        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem(
            "user",
            JSON.stringify(authenticatedUser)
        );

        setToken(token);
        setUser(authenticatedUser);

        console.log("End | Login");
    };


    const registerUser = async (
        request: RegisterRequest
    ): Promise<void> => {
        const response =
            await registerUserService(request);

        if (
            !response.success ||
            !response.data
        ) {
            throw new Error(
                response.message ||
                "Registration failed"
            );
        }

        const {
            user,
            token,
        } = response.data;

        await AsyncStorage.setItem(
            "user",
            JSON.stringify(user)
        );

        setUser(user);

        /*
         * If backend returns token after
         * registration, save it.
         */

        if (token) {
            await AsyncStorage.setItem(
                "token",
                token
            );

            setToken(token);
        }
    };


    const logout = async (): Promise<void> => {
        await AsyncStorage.removeItem(
            "token"
        );

        await AsyncStorage.removeItem(
            "user"
        );

        setToken(null);
        setUser(null);
    };


    return React.createElement(
        AuthContext.Provider,
        {
            value: {
                user,
                token,
                loading,
                loginUser,
                registerUser,
                logout,
            },
        },
        children
    );
};


export const useAuth = (): AuthContextType => {
    const context =
        useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
};