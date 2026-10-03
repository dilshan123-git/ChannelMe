import api from "./api";
import { AuthResponse } from "../types/auth";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const registerCustomer = async (
  data: RegisterData
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    "/auth/register",
    data
  );

  return response.data;
};

export const loginCustomer = async (
  data: LoginData
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    "/auth/login",
    data
  );

  return response.data;
};