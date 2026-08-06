import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import type { Service } from '../../../types/scheduling';
import { styles } from './styles';

type ServiceCardProps = {
  service: Service;
  onPress: () => void;
};

function formatPrice(price: number) {
  return price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export default function ServiceCard({ service, onPress }: ServiceCardProps) {
  return (
    <TouchableOpacity activeOpacity={0.86} style={styles.card} onPress={onPress}>
      <View style={styles.textGroup}>
        <Text style={styles.title}>{service.name}</Text>
        <Text style={styles.details}>
          {formatPrice(service.price)} • {service.duration} min
        </Text>
        {service.description ? <Text style={styles.description}>{service.description}</Text> : null}
      </View>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );
}
