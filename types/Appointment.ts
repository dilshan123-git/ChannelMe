import { Doctor } from "./Doctor";
import { User } from "./User";

export interface Appointment {
    _id: string;
    patient: User;
    doctor: Doctor;
    appointmentDate: string;
    appointmentTime: string;
    reason: string;
    status: "pending" | "confirmed" | "completed" | "cancelled";
    createdAt: string;
    updatedAt: string;
    __v: number;
}