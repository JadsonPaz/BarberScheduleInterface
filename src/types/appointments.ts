export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled' | 'done';

export type AppointmentUser = {
  _id?: string;
  fullname?: string;
  name?: string;
  email?: string;
  avatarUrl?: string | null;
};

export type AppointmentService = {
  _id?: string;
  name?: string;
  price?: number;
  duration?: number;
  description?: string;
};

export type Appointment = {
  _id: string;
  userId?: string | AppointmentUser;
  barberId?: string | AppointmentUser;
  serviceId?: string | AppointmentService;
  date: string;
  time: string;
  status: AppointmentStatus;
  price?: number;
  notes?: string | null;
  createdAt?: string;
  updatedAt?: string;
};
