import React, { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppointmentCard } from '../../../../components/cards/appointmentsCads';
import { ScreenHeader } from '../../../../components/headers/ScreenHeader';
import { getAppointmentsByUser } from '../../../../services/appointmentsService';
import type { Appointment } from '../../../../types/appointments';
import type { RootStackParamList } from '../../../../types/navigation';
import { isUpcomingAppointment } from '../../../../utils/appointments';
import { styles } from './styles';

type HistoryScreenProps = NativeStackScreenProps<RootStackParamList, 'History'>;

export default function HistoryScreen({ navigation, route }: HistoryScreenProps) {
  const userId = route.params?.user?._id || route.params?.user?.id;
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const historyAppointments = useMemo(
    () => appointments.filter((appointment) => !isUpcomingAppointment(appointment)),
    [appointments]
  );

  const loadAppointments = useCallback(async () => {
    if (!userId) return;

    try {
      setError('');
      setLoading(true);
      const result = await getAppointmentsByUser(userId);
      setAppointments(result);
    } catch {
      setError('Não foi possível carregar seu histórico.');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      loadAppointments();
    }, [loadAppointments])
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <ScreenHeader
          title="Histórico"
          subtitle="Agendamentos finalizados, cancelados ou vencidos."
          onBack={navigation.goBack}
        />

        {loading ? (
          <View style={styles.feedbackBox}>
            <ActivityIndicator color="#2F6B5F" />
          </View>
        ) : error ? (
          <View style={styles.feedbackBox}>
            <Text style={styles.feedbackText}>{error}</Text>
          </View>
        ) : historyAppointments.length === 0 ? (
          <View style={styles.feedbackBox}>
            <Text style={styles.feedbackText}>Nenhum histórico de agendamentos por enquanto.</Text>
          </View>
        ) : (
          historyAppointments.map((appointment) => (
            <AppointmentCard key={appointment._id} appointment={appointment} readonly />
          ))
        )}
      </ScrollView>
    </View>
  );
}
