import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

import type { Service } from '../../../types/scheduling';
import { StepCard } from './StepCard';
import { styles } from './styles';

type ServiceStepCardProps = {
  services: Service[];
  loading: boolean;
  onSelect: (service: Service) => void;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
}

export function ServiceStepCard({ services, loading, onSelect }: ServiceStepCardProps) {
  return (
    <StepCard title="Escolha o serviço" subtitle="Selecione o serviço que deseja agendar.">
      {loading ? (
        <View style={styles.feedback}>
          <ActivityIndicator color="#2F6B5F" />
        </View>
      ) : services.length === 0 ? (
        <View style={styles.feedback}>
          <Text style={styles.feedbackText}>Nenhum serviço disponível para esse barbeiro.</Text>
        </View>
      ) : (
        services.map((service) => (
          <TouchableOpacity
            key={service._id}
            activeOpacity={0.85}
            style={styles.option}
            onPress={() => onSelect(service)}
          >
            <Text style={styles.optionTitle}>{service.name}</Text>
            <Text style={styles.optionSubtitle}>
              {formatPrice(service.price)} • {service.duration} min
            </Text>
          </TouchableOpacity>
        ))
      )}
    </StepCard>
  );
}
