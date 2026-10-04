export interface Doctor {
  _id: string;
  name: string;
  qualification: string;
  experience: number;
  consultationFee: number;
  clinicName: string;
  availableDays: string[];
  startTime: string;
  endTime: string;
  image: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}