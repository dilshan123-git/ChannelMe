import { CommonResponse } from "@/types/CommonResponse";
import { Doctor } from "@/types/Doctor";
import { apiRequest } from "../api";

export const loadDoctors = async () => {
  try {
    const result = await apiRequest<CommonResponse<Doctor[]>>(
      "/doctors",
      {
        method: "GET",
      }
    );

    console.log("Doctors:", result);

    return result;
  } catch (error) {
    console.error("Load doctors error:", error);
    throw error;
  }
};
