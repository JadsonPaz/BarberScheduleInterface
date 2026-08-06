import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';

type ProfilePasswordCardProps = {
  onPress: () => void;
};

export default function ProfilePasswordCard({ onPress }: ProfilePasswordCardProps) {
  return (
    <TouchableOpacity activeOpacity={0.86} style={styles.card} onPress={onPress}>
      <View style={styles.textGroup}>
        <Text style={styles.title}>Alterar senha</Text>
        <Text style={styles.description}>Atualize sua senha de acesso.</Text>
      </View>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );
}
