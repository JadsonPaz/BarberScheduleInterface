import React from 'react';
import { Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import type { MonthOption } from './FinancialHeroCard';
import { styles } from './styles';

type MonthPickerPopupProps = {
  visible: boolean;
  months: MonthOption[];
  selectedMonthKey: string;
  onSelectMonth: (monthKey: string) => void;
  onClose: () => void;
};

export function MonthPickerPopup({
  visible,
  months,
  selectedMonthKey,
  onSelectMonth,
  onClose,
}: MonthPickerPopupProps) {
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable style={styles.monthModalCard}>
          <View style={styles.monthModalHeader}>
            <View>
              <Text style={styles.monthModalTitle}>Selecionar mes</Text>
              <Text style={styles.monthModalSubtitle}>Escolha o periodo do painel.</Text>
            </View>

            <TouchableOpacity activeOpacity={0.82} style={styles.closeButton} onPress={onClose}>
              <MaterialCommunityIcons name="close" size={22} color="#201B17" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.monthListContent}>
            {months.map((month) => {
              const selected = month.key === selectedMonthKey;

              return (
                <TouchableOpacity
                  key={month.key}
                  activeOpacity={0.82}
                  style={[styles.monthOption, selected && styles.monthOptionActive]}
                  onPress={() => {
                    onSelectMonth(month.key);
                    onClose();
                  }}
                >
                  <Text style={[styles.monthOptionText, selected && styles.monthOptionTextActive]}>
                    {month.label}
                  </Text>

                  {selected ? (
                    <MaterialCommunityIcons name="check-circle" size={22} color="#2F6B5F" />
                  ) : null}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
