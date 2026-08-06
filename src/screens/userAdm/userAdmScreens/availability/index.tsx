import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ScreenHeader } from '../../../../components/headers/ScreenHeader';
import type { RootStackParamList } from '../../../../types/navigation';
import { styles } from './styles';

type AvailabilityProps = NativeStackScreenProps<RootStackParamList, 'ManageAvailability'>;

const options = [
  {
    title: 'Gerenciar dias e horários',
    description: 'Edite os dias da semana e os horários de atendimento.',
    route: 'AvailabilityDays' as const,
  },
  {
    title: 'Horários bloqueados',
    description: 'Bloqueios especificos e recorrentes.',
    route: 'BlockedSlots' as const,
  },
];

export default function Availability({ navigation, route }: AvailabilityProps) {
  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Disponibilidade"
        subtitle="Organize quando você pode receber agendamentos."
        onBack={navigation.goBack}
      />

      <View style={styles.options}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.route}
            activeOpacity={0.86}
            style={styles.optionCard}
            onPress={() => navigation.navigate(option.route, route.params)}
          >
            <View style={styles.optionTextGroup}>
              <Text style={styles.optionTitle}>{option.title}</Text>
              <Text style={styles.optionDescription}>{option.description}</Text>
            </View>
            <Text style={styles.optionArrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
