import api from './api';
import type { Appointment , AppointmentStatus } from '../types/appointments';
import type { AuthUser } from '../types/auth';
import type { Availability, BlockedSlot, Service } from '../types/scheduling';


type ApiResponse<T> = {
  success: boolean;
  body?: T;
};

export async function getBarbers() {
  const response = await api.get<ApiResponse<AuthUser[]>>('/users/barbers');
  return response.data.body ?? [];
}

export async function getAvailabilityByBarber(barberId: string) {
  const response = await api.get<ApiResponse<Availability[]>>('/availability', {
    params: { barberId },
  });

  return response.data.body ?? [];
}

export async function createAvailability(data: {
  barberId: string;
  weekday: number;
  startTime: string;
  endTime: string;
  slotDuration: number;
}) {
  const response = await api.post<ApiResponse<Availability>>('/availability', data);
  return response.data.body;
}

export async function updateAvailability(
  availabilityId: string,
  data: {
    weekday?: number;
    startTime?: string;
    endTime?: string;
    slotDuration?: number;
  }
) {
  const response = await api.put<ApiResponse<Availability>>(`/availability/${availabilityId}`, data);
  return response.data.body;
}

export async function deleteAvailability(availabilityId: string) {
  const response = await api.delete<ApiResponse<Availability>>(`/availability/${availabilityId}`);
  return response.data.body;
}

export async function getBlockedSlotsByDate(barberId: string, date: string) {
  const response = await api.get<ApiResponse<BlockedSlot[]>>('/blocked-slots/date', {
    params: { barberId, date },
  });

  return response.data.body ?? [];
}

export async function getBlockedSlotsByBarber(barberId: string) {
  const response = await api.get<ApiResponse<BlockedSlot[]>>('/blocked-slots', {
    params: { barberId },
  });

  return response.data.body ?? [];
}

export type BlockedSlotPayload = {
  barberId: string;
  date?: string;
  weekday?: number;
  isFullDay?: boolean;
  startTime?: string;
  endTime?: string;
  reason?: string;
};

export async function createBlockedSlot(data: BlockedSlotPayload) {
  const response = await api.post<ApiResponse<BlockedSlot>>('/blocked-slots', data);
  return response.data.body;
}

export async function updateBlockedSlot(
  blockedSlotId: string,
  data: Omit<BlockedSlotPayload, 'barberId'> & { barberId?: string }
) {
  const response = await api.put<ApiResponse<BlockedSlot>>(`/blocked-slots/${blockedSlotId}`, data);
  return response.data.body;
}

export async function deleteBlockedSlot(blockedSlotId: string) {
  const response = await api.delete<ApiResponse<BlockedSlot>>(`/blocked-slots/${blockedSlotId}`);
  return response.data.body;
}

export async function getServicesByBarber(barberId: string) {
  const response = await api.get<ApiResponse<Service[]>>('/services', {
    params: { barberId, active: true },
  });

  return response.data.body ?? [];
}

export type ServicePayload = {
  barberId: string;
  name: string;
  price: number;
  duration: number;
  description?: string;
  active?: boolean;
};

export async function createService(data: ServicePayload) {
  const response = await api.post<ApiResponse<Service>>('/services', data);
  return response.data.body;
}

export async function updateService(
  serviceId: string,
  data: Partial<Omit<ServicePayload, 'barberId'>> & { barberId?: string }
) {
  const response = await api.put<ApiResponse<Service>>(`/services/${serviceId}`, data);
  return response.data.body;
}

export async function deleteService(serviceId: string) {
  const response = await api.delete<ApiResponse<Service>>(`/services/${serviceId}`);
  return response.data.body;
}

export async function getAppointmentsByBarberDate(barberId: string, date: string) {
  const response = await api.get<ApiResponse<Appointment[]>>('/appointments', {
    params: { barberId },
  });

  return (response.data.body ?? []).filter((appointment) => {
    const appointmentDate = appointment.date.includes('T')
      ? appointment.date.split('T')[0]
      : appointment.date;

    return appointmentDate === date && appointment.status !== 'cancelled';
  });
}

export async function createAppointment(data: {
  userId: string;
  barberId: string;
  serviceId: string;
  date: string;
  time: string;
  price: number;
  notes?: string;
  status?: AppointmentStatus;

}) {
  const response = await api.post<ApiResponse<Appointment>>('/appointments', data);
  return response.data.body;
}
