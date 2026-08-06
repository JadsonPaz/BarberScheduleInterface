import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from './styles';

type ScreenHeaderProps = {
  title: string;
  subtitle?: string;
  onBack: () => void;
};

export function ScreenHeader({ title, subtitle, onBack }: ScreenHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Voltar"
          hitSlop={8}
          onPress={onBack}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color="#201B17" />
        </Pressable>

        <Text style={styles.title} numberOfLines={2}>{title}</Text>
      </View>

      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}
