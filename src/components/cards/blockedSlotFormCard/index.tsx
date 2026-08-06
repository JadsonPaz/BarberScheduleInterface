import React, { type ReactNode } from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';

type BlockedSlotFormCardProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export default function BlockedSlotFormCard({ title, subtitle, children }: BlockedSlotFormCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      {children}
    </View>
  );
}
