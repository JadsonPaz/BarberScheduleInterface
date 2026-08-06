import type { Appointment } from '../types/appointments';

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getName(value: unknown) {
  if (!isObject(value)) return undefined;

  const fullname = value.fullname;
  const name = value.name;

  return typeof fullname === 'string' ? fullname : typeof name === 'string' ? name : undefined;
}

export function getAppointmentServiceName(appointment: Appointment) {
  if (isObject(appointment.serviceId) && typeof appointment.serviceId.name === 'string') {
    return appointment.serviceId.name;
  }

  return 'Serviço';
}

export function getAppointmentBarberName(appointment: Appointment) {
  return getName(appointment.barberId) ?? 'Barbeiro não informado';
}

export function getAppointmentClientName(appointment: Appointment) {
  return getName(appointment.userId) ?? 'Cliente não informado';
}

export function formatAppointmentDate(date: string) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function formatAppointmentPrice(appointment: Appointment) {
  const price = getAppointmentPrice(appointment);

  if (typeof price !== 'number') {
    return 'Não informado';
  }

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
}

export function getAppointmentPrice(appointment: Appointment) {
  const servicePrice =
    isObject(appointment.serviceId) && typeof appointment.serviceId.price === 'number'
      ? appointment.serviceId.price
      : undefined;

  return appointment.price ?? servicePrice;
}

export function formatAppointmentStatus(status: Appointment['status']) {
  const labels = {
    pending: 'Pendente',
    confirmed: 'Confirmado',
    cancelled: 'Cancelado',
    done: 'Concluído',
  };

  return labels[status] ?? status;
}

export function isUpcomingAppointment(appointment: Appointment) {
  if (appointment.status === 'cancelled' || appointment.status === 'done') {
    return false;
  }

  const dateOnly = appointment.date.includes('T')
    ? appointment.date.split('T')[0]
    : appointment.date;
  const appointmentDate = new Date(`${dateOnly}T${appointment.time || '00:00'}`);

  if (Number.isNaN(appointmentDate.getTime())) {
    return true;
  }

  return appointmentDate >= new Date();
}
