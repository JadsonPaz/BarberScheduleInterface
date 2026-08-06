import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

import type { Availability } from '../../../types/scheduling';
import { styles } from './styles';

type AvailabilityDayCardProps = {
  label: string;
  availability?: Availability;
  isToggling: boolean;
  onPress: () => void;
  onToggle: () => void;
};

export default function AvailabilityDayCard({
  label,
  availability,
  isToggling,
  onPress,
  onToggle,
}: AvailabilityDayCardProps) {
  const isActive = Boolean(availability);

  return (
    <TouchableOpacity
      activeOpacity={isActive ? 0.86 : 1}
      style={[styles.dayCard, !isActive && styles.dayCardInactive]}
      onPress={onPress}
    >
      <View style={styles.dayMain}>
        <View style={[styles.statusBox, isActive && styles.statusBoxActive]}>
          <Text style={styles.statusMark}>{isActive ? '✓' : ''}</Text>
        </View>

        <View style={styles.dayTextGroup}>
          <Text style={styles.dayName}>{label}</Text>
          <Text style={[styles.dayTime, !isActive && styles.closedText]}>
            {isActive ? `${availability?.startTime} -> ${availability?.endTime}` : 'Fechado'}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.82}
        style={[styles.toggleButton, isActive && styles.toggleButtonActive]}
        onPress={onToggle}
        disabled={isToggling}
      >
        {isToggling ? (
          <ActivityIndicator color={isActive ? '#9E321F' : '#2F6B5F'} size="small" />
        ) : (
          <Text style={[styles.toggleText, isActive && styles.toggleTextActive]}>
            {isActive ? 'Ativo' : 'Inativo'}
          </Text>
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
