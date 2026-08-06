import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';

type ProfileInfoCardProps = {
  name: string;
  email?: string;
  onPress: () => void;
};

export default function ProfileInfoCard({ name, email, onPress }: ProfileInfoCardProps) {
  return (
    <TouchableOpacity activeOpacity={0.86} style={styles.card} onPress={onPress}>
      <View style={styles.textGroup}>
        <Text style={styles.title}>Nome e e-mail</Text>
        <Text style={styles.name}>{name || 'Sem nome'}</Text>
        {email ? <Text style={styles.email}>{email}</Text> : null}
      </View>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );
}
