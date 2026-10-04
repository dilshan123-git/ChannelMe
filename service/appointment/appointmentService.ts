import { CommonResponse } from "@/types/CommonResponse";
import { MakeAppointmentRequest } from "@/types/MakeAppointmentRequest";
import { apiRequest } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appointment } from "@/types/Appointment";

export const makeAppoinment = async (
  data: MakeAppointmentRequest
) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const userData = await AsyncStorage.getItem("user");


    if (!userData) {
      throw new Error("User not found");
    }

    const user = JSON.parse(userData);

    const appointmentData = {
      ...data,
      patient: user.id,
    };
    

    const result : CommonResponse<Appointment> =
      await apiRequest(
        "/appointments",
        {
          method: "POST",
          body: appointmentData,
          token: token || undefined,
        }
      );
      
    return result;
  } catch (error) {
    console.error(
      "Make appointment error:",
      error
    );

    throw error;
  }
};

export const upCommingAppointments = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log("Token:", token);
    return await apiRequest<CommonResponse<Appointment[]>>(
      "/appointments/upcoming",
      {
        method: "GET",
        token: token || undefined,
      }
    );
  } catch (error) {
    console.error(
      "Get upcoming appointments error:",
      error
    );

    throw error;
  }
};
