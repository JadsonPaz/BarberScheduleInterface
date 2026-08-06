import React from 'react';
import { Image, Text, View } from 'react-native';

import type { AppointmentUser } from '../../../types/appointments';
import { styles } from './styles';

type ClientCardProps = {
  client: AppointmentUser;
  count: number;
};

function getInitials(client: AppointmentUser) {
  const name = client.fullname || client.name || client.email || 'C';
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

export default function ClientCard({ client, count }: ClientCardProps) {
  const displayName = client.fullname || client.name || 'Cliente';

  return (
    <View style={styles.card}>
      <View style={styles.avatar}>
        {client.avatarUrl ? (
          <Image source={{ uri: client.avatarUrl }} style={styles.avatarImage} />
        ) : (
          <Text style={styles.avatarInitials}>{getInitials(client)}</Text>
        )}
      </View>

      <View style={styles.textGroup}>
        <Text style={styles.name}>{displayName}</Text>
        <Text style={styles.count}>{count} agendamentos</Text>
      </View>
    </View>
  );
}
