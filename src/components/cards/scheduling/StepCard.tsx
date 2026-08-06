import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';

type StepCardProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export function StepCard({ title, subtitle, children }: StepCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      {children}
    </View>
  );
}
