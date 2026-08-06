import React from 'react';
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native';

import type { Barber } from '../../../types/scheduling';
import { getEntityName } from '../../../utils/scheduling';
import { StepCard } from './StepCard';
import { styles } from './styles';

type BarberStepCardProps = {
  barbers: Barber[];
  loading: boolean;
  onSelect: (barber: Barber) => void;
};

function getInitials(barber: Barber) {
  const name = getEntityName(barber);

  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

export function BarberStepCard({ barbers, loading, onSelect }: BarberStepCardProps) {
  return (
    <StepCard title="Escolha o Barbeiro" subtitle="Selecione quem vai realizar o atendimento.">
      {loading ? (
        <View style={styles.feedback}>
          <ActivityIndicator color="#2F6B5F" />
        </View>
      ) : barbers.length === 0 ? (
        <View style={styles.feedback}>
          <Text style={styles.feedbackText}>Nenhum barbeiro disponível.</Text>
        </View>
      ) : (
        barbers.map((barber) => (
          <TouchableOpacity
            key={barber._id || barber.id}
            activeOpacity={0.85}
            style={[styles.option, styles.barberOption]}
            onPress={() => onSelect(barber)}
          >
            <View style={styles.barberAvatar}>
              {barber.avatarUrl ? (
                <Image source={{ uri: barber.avatarUrl }} style={styles.barberAvatarImage} />
              ) : (
                <Text style={styles.barberAvatarText}>{getInitials(barber)}</Text>
              )}
            </View>
            <Text style={styles.optionTitle}>{getEntityName(barber)}</Text>
          </TouchableOpacity>
        ))
      )}
    </StepCard>
  );
}
