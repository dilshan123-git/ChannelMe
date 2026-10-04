

import { CommonResponse } from "@/types/CommonResponse";

import { LoginRequest } from "@/types/LoginRequest";
import { LoginResponse } from "@/types/LoginResponse";

import { RegisterRequest } from "@/types/RegisterRequest";
import { RegisterResponse } from "@/types/RegisterResponse";
import { apiRequest } from "../api";


export const loginUser = async (
  request: LoginRequest
): Promise<CommonResponse<LoginResponse>> => {
  return apiRequest<CommonResponse<LoginResponse>>(
    "/auth/login",
    {
      method: "POST",
      body: request,
    }
  );
};

export const registerUser = async (
  request: RegisterRequest
): Promise<CommonResponse<RegisterResponse>> => {
  return apiRequest<CommonResponse<RegisterResponse>>(
    "/auth/register",
    {
      method: "POST",
      body: request,
    }
  );
};