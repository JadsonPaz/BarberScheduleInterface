import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';

import ClientCard from '../../../../components/cards/clientCard';
import { ScreenHeader } from '../../../../components/headers/ScreenHeader';
import { getAppointmentsByBarber } from '../../../../services/appointmentsService';
import type { AppointmentUser } from '../../../../types/appointments';
import type { RootStackParamList } from '../../../../types/navigation';
import { styles } from './styles';

type ClientScreenProps = NativeStackScreenProps<RootStackParamList, 'Clients'>;

type FrequentClient = {
  client: AppointmentUser;
  count: number;
};

function getClientId(client?: string | AppointmentUser) {
  if (!client || typeof client === 'string') {
    return client;
  }

  return client._id;
}

export default function Client({ navigation, route }: ClientScreenProps) {
  const barberId = route.params?.user.id || route.params?.user._id;
  const [clients, setClients] = useState<FrequentClient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadClients = useCallback(async () => {
    if (!barberId) {
      setError('Não foi possível identificar o barbeiro logado.');
      setIsLoading(false);
      return;
    }

    try {
      setError('');
      const appointments = await getAppointmentsByBarber(barberId);
      const clientMap = new Map<string, FrequentClient>();

      appointments.forEach((appointment) => {
        const clientId = getClientId(appointment.userId);

        if (!appointment.userId || !clientId || typeof appointment.userId === 'string') {
          return;
        }

        const client = appointment.userId;
        const current = clientMap.get(clientId);

        if (current) {
          current.count += 1;
        } else {
          clientMap.set(clientId, {
            client,
            count: 1,
          });
        }
      });

      setClients(
        Array.from(clientMap.values())
          .filter((item) => item.count >= 3)
          .sort((a, b) => b.count - a.count)
      );
    } catch {
      setError('Não foi possível carregar os clientes.');
    } finally {
      setIsLoading(false);
    }
  }, [barberId]);

  useEffect(() => {
    loadClients();
  }, [loadClients]);

  useFocusEffect(
    useCallback(() => {
      loadClients();
    }, [loadClients])
  );

  const subtitle = useMemo(() => {
    if (clients.length === 1) {
      return '1 cliente já agendou pelo menos 3 vezes com você.';
    }

    return `${clients.length} clientes já agendaram pelo menos 3 vezes com você.`;
  }, [clients.length]);

  return (
    <View style={styles.container}>
      <ScreenHeader title="Clientes" subtitle={subtitle} onBack={navigation.goBack} />

      {isLoading ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator color="#2F6B5F" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {clients.length ? (
            clients.map((item) => (
              <ClientCard key={item.client._id} client={item.client} count={item.count} />
            ))
          ) : (
            <Text style={styles.emptyText}>Nenhum cliente com 3 agendamentos no histórico ainda.</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
}
