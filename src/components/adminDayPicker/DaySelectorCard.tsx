import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { styles } from './styles';

type DaySelectorCardProps = {
  selectedDateLabel: string;
  onPress: () => void;
};

export function DaySelectorCard({ selectedDateLabel, onPress }: DaySelectorCardProps) {
  return (
    <TouchableOpacity activeOpacity={0.84} style={styles.selectorCard} onPress={onPress}>
      <View style={styles.selectorTextGroup}>
        <Text style={styles.selectorLabel}>Dia selecionado</Text>
        <Text style={styles.selectorDate}>{selectedDateLabel}</Text>
      </View>

      <View style={styles.selectorIconBox}>
        <MaterialCommunityIcons name="calendar-search-outline" size={24} color="#2F6B5F" />
      </View>
    </TouchableOpacity>
  );
}
