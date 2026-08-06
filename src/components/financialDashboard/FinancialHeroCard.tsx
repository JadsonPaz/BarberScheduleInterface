import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { styles } from './styles';

export type MonthOption = {
  key: string;
  label: string;
  shortLabel: string;
};

type FinancialHeroCardProps = {
  selectedMonthLabel: string;
  revenue: string;
  clientsCount: number;
  onOpenMonthPicker: () => void;
};

export function FinancialHeroCard({
  selectedMonthLabel,
  revenue,
  clientsCount,
  onOpenMonthPicker,
}: FinancialHeroCardProps) {
  return (
    <View style={styles.heroCard}>
      <TouchableOpacity
        activeOpacity={0.84}
        style={styles.monthSelectorButton}
        onPress={onOpenMonthPicker}
      >
        <View style={styles.monthSelectorTextGroup}>
          <Text style={styles.selectorLabel}>Mes selecionado</Text>
          <Text style={styles.selectedMonthText}>{selectedMonthLabel}</Text>
        </View>

        <View style={styles.monthSelectorIconBox}>
          <MaterialCommunityIcons name="calendar-month-outline" size={22} color="#2F6B5F" />
        </View>
      </TouchableOpacity>

      <View style={styles.heroDivider} />

      <View style={styles.metricBlock}>
        <Text style={styles.metricLabel}>Faturamento do mes</Text>
        <Text style={styles.revenueValue}>{revenue}</Text>
      </View>

      <View style={styles.attendanceBox}>
        <View style={styles.attendanceIconBox}>
          <MaterialCommunityIcons name="account-check-outline" size={26} color="#2F6B5F" />
        </View>
        <View style={styles.attendanceTextGroup}>
          <Text style={styles.attendanceValue}>{clientsCount}</Text>
          <Text style={styles.attendanceLabel}>
            {clientsCount === 1 ? 'cliente atendido' : 'clientes atendidos'}
          </Text>
        </View>
      </View>
    </View>
  );
}
