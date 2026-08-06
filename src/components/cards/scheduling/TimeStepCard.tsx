import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

import { StepCard } from './StepCard';
import { styles } from './styles';

type TimeStepCardProps = {
  times: string[];
  loading: boolean;
  onSelect: (time: string) => void;
};

export function TimeStepCard({ times, loading, onSelect }: TimeStepCardProps) {
  return (
    <StepCard title="Horário" subtitle="Escolha um dos horários livres para esse dia.">
      {loading ? (
        <View style={styles.feedback}>
          <ActivityIndicator color="#2F6B5F" />
        </View>
      ) : times.length === 0 ? (
        <View style={styles.feedback}>
          <Text style={styles.feedbackText}>Nenhum horário disponível para esse dia.</Text>
        </View>
      ) : (
        <View style={styles.grid}>
          {times.map((time) => (
            <TouchableOpacity
              key={time}
              activeOpacity={0.85}
              style={styles.timeButton}
              onPress={() => onSelect(time)}
            >
              <Text style={styles.timeText}>{time}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </StepCard>
  );
}
