import React, { useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import type { Availability, BlockedSlot } from '../../../types/scheduling';
import {
  addMonths,
  formatDateToApi,
  getSelectableWeekdays,
  isDateFullyBlocked,
  isSameMonth,
} from '../../../utils/scheduling';
import { StepCard } from './StepCard';
import { styles } from './styles';

const weekLabels = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

type DateStepCardProps = {
  availabilities: Availability[];
  blockedSlots: BlockedSlot[];
  onSelect: (date: string) => void;
};

export function DateStepCard({ availabilities, blockedSlots, onSelect }: DateStepCardProps) {
  const today = useMemo(() => new Date(), []);
  const maxDate = useMemo(() => addMonths(today, 2), [today]);
  const [visibleMonth, setVisibleMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [calendarWidth, setCalendarWidth] = useState(0);
  const selectableWeekdays = useMemo(() => getSelectableWeekdays(availabilities), [availabilities]);
  const daySize = calendarWidth > 0 ? Math.floor(calendarWidth / 7) : undefined;

  const days = useMemo(() => {
    const firstDay = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1);
    const startOffset = firstDay.getDay();
    const daysInMonth = new Date(
      visibleMonth.getFullYear(),
      visibleMonth.getMonth() + 1,
      0
    ).getDate();

    return [
      ...Array.from({ length: startOffset }, () => null),
      ...Array.from({ length: daysInMonth }, (_, index) => (
        new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), index + 1)
      )),
    ];
  }, [visibleMonth]);

  const canGoPrevious = !isSameMonth(visibleMonth, today);
  const canGoNext = !isSameMonth(visibleMonth, maxDate);

  function isSelectable(date: Date) {
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());

    if (date < startOfToday || date > endDate || !selectableWeekdays.has(date.getDay())) {
      return false;
    }

    return !isDateFullyBlocked(formatDateToApi(date), availabilities, blockedSlots);
  }

  function changeMonth(direction: -1 | 1) {
    setVisibleMonth((currentMonth) => (
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + direction, 1)
    ));
  }

  const fixedCellStyle = daySize ? { width: daySize, height: daySize } : null;
  const fixedWeekLabelStyle = daySize ? { width: daySize, flex: 0 } : null;

  return (
    <StepCard title="Escolha o dia" subtitle="Somente datas disponíveis nos próximos 2 meses aparecem ativas.">
      <View style={styles.calendarHeader}>
        <TouchableOpacity
          activeOpacity={0.85}
          style={[styles.monthButton, !canGoPrevious && styles.monthButtonDisabled]}
          disabled={!canGoPrevious}
          onPress={() => changeMonth(-1)}
        >
          <Text style={styles.monthButtonText}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.calendarTitle} numberOfLines={1}>
          {visibleMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
        </Text>

        <TouchableOpacity
          activeOpacity={0.85}
          style={[styles.monthButton, !canGoNext && styles.monthButtonDisabled]}
          disabled={!canGoNext}
          onPress={() => changeMonth(1)}
        >
          <Text style={styles.monthButtonText}>›</Text>
        </TouchableOpacity>
      </View>

      <View
        onLayout={(event) => setCalendarWidth(event.nativeEvent.layout.width)}
        style={styles.calendarGrid}
      >
        <View style={styles.weekRow}>
          {weekLabels.map((label, index) => (
            <Text key={`${label}-${index}`} style={[styles.weekLabel, fixedWeekLabelStyle]}>
              {label}
            </Text>
          ))}
        </View>

        <View style={styles.dayGrid}>
          {days.map((date, index) => {
            const selectable = Boolean(date && isSelectable(date));

            return (
              <View key={date ? formatDateToApi(date) : `empty-${index}`} style={[styles.dayCell, fixedCellStyle]}>
                {date && (
                  <TouchableOpacity
                    activeOpacity={0.85}
                    style={[styles.dayButton, !selectable && styles.dayButtonDisabled]}
                    disabled={!selectable}
                    onPress={() => onSelect(formatDateToApi(date))}
                  >
                    <Text style={[styles.dayText, !selectable && styles.dayTextDisabled]}>
                      {date.getDate()}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </View>
      </View>
    </StepCard>
  );
}
