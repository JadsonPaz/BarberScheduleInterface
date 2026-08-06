import type { Appointment } from '../types/appointments';
import type { Availability, BlockedSlot } from '../types/scheduling';

export function getEntityId(entity: { _id?: string; id?: string } | string | undefined) {
  if (!entity) return '';
  return typeof entity === 'string' ? entity : entity._id || entity.id || '';
}

export function getEntityName(entity: { fullname?: string; name?: string } | string | undefined) {
  if (!entity || typeof entity === 'string') return 'Sem nome';
  return entity.fullname || entity.name || 'Sem nome';
}

export function formatDateToApi(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function formatFriendlyDate(date: string) {
  const parsedDate = new Date(`${date}T00:00:00`);

  return parsedDate.toLocaleDateString('pt-BR', {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
  });
}

export function addMonths(date: Date, months: number) {
  const nextDate = new Date(date);
  nextDate.setMonth(nextDate.getMonth() + months);
  return nextDate;
}

export function isSameMonth(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

export function timeToMinutes(time: string) {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

export function minutesToTime(minutes: number) {
  const hours = String(Math.floor(minutes / 60)).padStart(2, '0');
  const mins = String(minutes % 60).padStart(2, '0');
  return `${hours}:${mins}`;
}

export function generateSlotsForDate(date: string, availabilities: Availability[]) {
  const weekday = new Date(`${date}T00:00:00`).getDay();
  const dayAvailabilities = availabilities.filter((availability) => availability.weekday === weekday);

  return dayAvailabilities.flatMap((availability) => {
    const slots: string[] = [];
    const slotDuration = availability.slotDuration || 30;
    let current = timeToMinutes(availability.startTime);
    const end = timeToMinutes(availability.endTime);

    while (current + slotDuration <= end) {
      slots.push(minutesToTime(current));
      current += slotDuration;
    }

    return slots;
  });
}

export function filterUnavailableSlots(
  slots: string[],
  blockedSlots: BlockedSlot[],
  appointments: Appointment[]
) {
  return slots.filter((slot) => {
    const slotMinutes = timeToMinutes(slot);
    const isBlocked = blockedSlots.some((blockedSlot) => {
      if (blockedSlot.isFullDay) {
        return true;
      }

      if (!blockedSlot.startTime || !blockedSlot.endTime) {
        return false;
      }

      return (
        slotMinutes >= timeToMinutes(blockedSlot.startTime) &&
        slotMinutes < timeToMinutes(blockedSlot.endTime)
      );
    });
    const isTaken = appointments.some((appointment) => appointment.time === slot);

    return !isBlocked && !isTaken;
  });
}

export function getSelectableWeekdays(availabilities: Availability[]) {
  return new Set(availabilities.map((availability) => availability.weekday));
}

export function getBlockedSlotsForCalendarDate(date: string, blockedSlots: BlockedSlot[]) {
  const weekday = new Date(`${date}T00:00:00`).getDay();

  return blockedSlots.filter((blockedSlot) => {
    const blockDate = blockedSlot.date
      ? blockedSlot.date.includes('T')
        ? blockedSlot.date.split('T')[0]
        : blockedSlot.date
      : null;

    return blockDate === date || blockedSlot.weekday === weekday;
  });
}

export function isDateFullyBlocked(
  date: string,
  availabilities: Availability[],
  blockedSlots: BlockedSlot[]
) {
  const generatedSlots = generateSlotsForDate(date, availabilities);

  if (generatedSlots.length === 0) {
    return true;
  }

  const dateBlockedSlots = getBlockedSlotsForCalendarDate(date, blockedSlots);

  if (dateBlockedSlots.some((blockedSlot) => blockedSlot.isFullDay)) {
    return true;
  }

  return filterUnavailableSlots(generatedSlots, dateBlockedSlots, []).length === 0;
}
