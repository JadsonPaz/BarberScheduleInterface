import React, { useEffect, useMemo, useState } from 'react';
import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { styles } from './styles';

type DayPickerPopupProps = {
  visible: boolean;
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  onClose: () => void;
};

const weekdays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

function formatDateToKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return year + '-' + month + '-' + day;
}

function getMonthTitle(date: Date) {
  return date.toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric',
  });
}

function buildCalendarDays(monthDate: Date) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const items: Array<Date | null> = [];

  for (let index = 0; index < firstDay; index += 1) {
    items.push(null);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    items.push(new Date(year, month, day));
  }

  while (items.length % 7 !== 0) {
    items.push(null);
  }

  return items;
}

export function DayPickerPopup({ visible, selectedDate, onSelectDate, onClose }: DayPickerPopupProps) {
  const [visibleMonth, setVisibleMonth] = useState(
    new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
  );

  useEffect(() => {
    if (visible) {
      setVisibleMonth(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));
    }
  }, [selectedDate, visible]);

  const selectedKey = useMemo(() => formatDateToKey(selectedDate), [selectedDate]);
  const todayKey = useMemo(() => formatDateToKey(new Date()), []);
  const calendarDays = useMemo(() => buildCalendarDays(visibleMonth), [visibleMonth]);

  function changeMonth(direction: number) {
    setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() + direction, 1));
  }

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable style={styles.modalCard}>
          <View style={styles.modalHeader}>
            <View>
              <Text style={styles.modalTitle}>Selecionar dia</Text>
              <Text style={styles.modalSubtitle}>Escolha o dia da agenda.</Text>
            </View>

            <TouchableOpacity activeOpacity={0.82} style={styles.closeButton} onPress={onClose}>
              <MaterialCommunityIcons name="close" size={22} color="#201B17" />
            </TouchableOpacity>
          </View>

          <View style={styles.monthNavigator}>
            <TouchableOpacity activeOpacity={0.82} style={styles.navButton} onPress={() => changeMonth(-1)}>
              <MaterialCommunityIcons name="chevron-left" size={24} color="#201B17" />
            </TouchableOpacity>

            <Text style={styles.monthTitle}>{getMonthTitle(visibleMonth)}</Text>

            <TouchableOpacity activeOpacity={0.82} style={styles.navButton} onPress={() => changeMonth(1)}>
              <MaterialCommunityIcons name="chevron-right" size={24} color="#201B17" />
            </TouchableOpacity>
          </View>

          <View style={styles.weekdaysRow}>
            {weekdays.map((weekday, index) => (
              <Text key={weekday + index} style={styles.weekdayText}>{weekday}</Text>
            ))}
          </View>

          <View style={styles.daysGrid}>
            {calendarDays.map((date, index) => {
              const key = date ? formatDateToKey(date) : 'empty-' + index;
              const selected = Boolean(date && key === selectedKey);
              const today = Boolean(date && key === todayKey);

              return (
                <TouchableOpacity
                  key={key}
                  activeOpacity={date ? 0.82 : 1}
                  disabled={!date}
                  style={[
                    styles.dayCell,
                    !date && styles.dayCellEmpty,
                    today && styles.dayCellToday,
                    selected && styles.dayCellSelected,
                  ]}
                  onPress={() => {
                    if (!date) return;
                    onSelectDate(date);
                    onClose();
                  }}
                >
                  {date ? (
                    <Text style={[styles.dayText, selected && styles.dayTextSelected]}>
                      {date.getDate()}
                    </Text>
                  ) : null}
                </TouchableOpacity>
              );
            })}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
