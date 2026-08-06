import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import type { BlockedSlot } from '../../../types/scheduling';
import { styles } from './styles';

type BlockedSlotCardProps = {
  blockedSlot: BlockedSlot;
  onPress: () => void;
};

const weekdayNames = ['Domingo', 'Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta', 'Sabado'];

function formatDate(date?: string | null) {
  if (!date) return '';
  const cleanDate = date.includes('T') ? date.split('T')[0] : date;
  const [year, month, day] = cleanDate.split('-');
  return `${day}/${month}/${year}`;
}

function getTitle(blockedSlot: BlockedSlot) {
  if (blockedSlot.date) {
    return `Data especifica - ${formatDate(blockedSlot.date)}`;
  }

  if (blockedSlot.weekday !== undefined && blockedSlot.weekday !== null) {
    return `Toda semana - ${weekdayNames[blockedSlot.weekday]}`;
  }

  return 'Bloqueio';
}

function getTimeLabel(blockedSlot: BlockedSlot) {
  if (blockedSlot.isFullDay) {
    return 'Dia inteiro';
  }

  return `${blockedSlot.startTime ?? '--:--'} -> ${blockedSlot.endTime ?? '--:--'}`;
}

export default function BlockedSlotCard({ blockedSlot, onPress }: BlockedSlotCardProps) {
  return (
    <TouchableOpacity activeOpacity={0.86} style={styles.card} onPress={onPress}>
      <View style={styles.textGroup}>
        <Text style={styles.title}>{getTitle(blockedSlot)}</Text>
        <Text style={styles.time}>{getTimeLabel(blockedSlot)}</Text>
        {blockedSlot.reason ? <Text style={styles.reason}>{blockedSlot.reason}</Text> : null}
      </View>

      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );
}
