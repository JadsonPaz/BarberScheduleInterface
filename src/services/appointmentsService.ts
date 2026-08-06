import api from './api';
import type { Appointment, AppointmentStatus } from '../types/appointments';

type ApiListResponse = {
  success: boolean;
  body?: Appointment[];
};

type ApiAppointmentResponse = {
  success: boolean;
  body?: Appointment;
};

export async function getAppointmentsByUser(userId: string) {
  const response = await api.get<ApiListResponse>('/appointments', {
    params: { userId },
  });

  return response.data.body ?? [];
}

export async function getAppointmentsByBarber(barberId: string) {
  const response = await api.get<ApiListResponse>('/appointments', {
    params: { barberId },
  });

  return response.data.body ?? [];
}

export async function cancelAppointment(appointmentId: string) {
  const response = await api.delete<ApiAppointmentResponse>(`/appointments/${appointmentId}`);
  return response.data.body;
}

export async function updateAppointmentStatus(appointmentId: string, status: AppointmentStatus) {
  const response = await api.put<ApiAppointmentResponse>(`/appointments/${appointmentId}`, { status });
  return response.data.body;
}
