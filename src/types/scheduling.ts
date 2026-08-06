import type { AuthUser } from './auth';

export type Barber = AuthUser;

export type Availability = {
  _id: string;
  barberId: string | Barber;
  weekday: number;
  startTime: string;
  endTime: string;
  slotDuration?: number;
};

export type BlockedSlot = {
  _id: string;
  barberId: string | Barber;
  weekday?: number | null;
  date?: string | null;
  isFullDay?: boolean;
  startTime?: string | null;
  endTime?: string | null;
  reason?: string | null;
};

export type Service = {
  _id: string;
  name: string;
  description?: string;
  price: number;
  duration: number;
  barberId?: string | Barber;
  active?: boolean;
};

export type SchedulingStep = 'barber' | 'date' | 'time' | 'service';
