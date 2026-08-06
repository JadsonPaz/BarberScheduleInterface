import React, { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppointmentCard } from '../../../../components/cards/appointmentsCads';
import { ScreenHeader } from '../../../../components/headers/ScreenHeader';
import { AppointmentPopup } from '../../../../components/popups/cardPopup';
import {
  cancelAppointment,
  getAppointmentsByUser,
} from '../../../../services/appointmentsService';
import type { Appointment } from '../../../../types/appointments';
import type { RootStackParamList } from '../../../../types/navigation';
import { isUpcomingAppointment } from '../../../../utils/appointments';
import { styles } from './styles';

type MyAppointmentsScreenProps = NativeStackScreenProps<RootStackParamList, 'MyAppointments'>;

export default function MyAppointmentsScreen({ navigation, route }: MyAppointmentsScreenProps) {
  const userId = route.params?.user?._id || route.params?.user?.id;
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cancelingAppointmentId, setCancelingAppointmentId] = useState<string | null>(null);

  const upcomingAppointments = useMemo(
    () => appointments.filter(isUpcomingAppointment),
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
      setError('Não foi possível carregar seus agendamentos.');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      loadAppointments();
    }, [loadAppointments])
  );

  async function handleCancelAppointment(appointment: Appointment) {
    try {
      setCancelingAppointmentId(appointment._id);
      await cancelAppointment(appointment._id);
      setAppointments((currentAppointments) =>
        currentAppointments.filter((currentAppointment) => currentAppointment._id !== appointment._id)
      );
      if (selectedAppointment?._id === appointment._id) {
        setSelectedAppointment(null);
      }
    } finally {
      setCancelingAppointmentId(null);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <ScreenHeader
          title="Meus agendamentos"
          subtitle="Veja seus próximos horários marcados."
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
        ) : upcomingAppointments.length === 0 ? (
          <View style={styles.feedbackBox}>
            <Text style={styles.feedbackText}>Você ainda não tem horários agendados</Text>
          </View>
        ) : (
          upcomingAppointments.map((appointment) => (
            <AppointmentCard
              key={appointment._id}
              appointment={appointment}
              onPress={setSelectedAppointment}
              onCancel={handleCancelAppointment}
              cancelLoading={cancelingAppointmentId === appointment._id}
            />
          ))
        )}
      </ScrollView>

      <AppointmentPopup
        visible={Boolean(selectedAppointment)}
        appointment={selectedAppointment}
        onClose={() => setSelectedAppointment(null)}
      />
    </View>
  );
}
