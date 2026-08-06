import React, { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppointmentCard } from '../../components/cards/appointmentsCads';
import { AppointmentPopup } from '../../components/popups/cardPopup';
import {
  cancelAppointment,
  getAppointmentsByUser,
} from '../../services/appointmentsService';
import type { Appointment } from '../../types/appointments';
import type { BottomTabParamList, RootStackParamList } from '../../types/navigation';
import { isUpcomingAppointment } from '../../utils/appointments';
import { styles } from './styles';

type HomeScreenProps = BottomTabScreenProps<BottomTabParamList, 'Home'>;

export default function HomeScreen({ navigation, route }: HomeScreenProps) {
  const insets = useSafeAreaInsets();
  const user = route.params?.user;
  const userId = user?._id || user?.id;
  const displayName = user?.fullname || user?.name || 'Usuario';
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [loadingAppointments, setLoadingAppointments] = useState(false);
  const [appointmentsError, setAppointmentsError] = useState('');
  const [cancelingAppointmentId, setCancelingAppointmentId] = useState<string | null>(null);

  const upcomingAppointments = useMemo(
    () => appointments.filter(isUpcomingAppointment),
    [appointments]
  );

  const loadAppointments = useCallback(async () => {
    if (!userId) return;

    try {
      setAppointmentsError('');
      setLoadingAppointments(true);
      const result = await getAppointmentsByUser(userId);
      setAppointments(result);
    } catch {
      setAppointmentsError('Não foi possível carregar seus agendamentos.');
    } finally {
      setLoadingAppointments(false);
    }
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      loadAppointments();
    }, [loadAppointments])
  );

  function handleSchedulingPress() {
    navigation
      .getParent<NativeStackNavigationProp<RootStackParamList>>()
      ?.navigate('Scheduling', route.params);
  }

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
      <LinearGradient
        colors={['#2F6B5F', '#4F8D7D']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[styles.header, { paddingTop: insets.top + 26 }]}
      >
        <View style={styles.headerTextGroup}>
          <Text style={styles.greeting}>Olá, {displayName}</Text>
          <Text style={styles.subtitle}>Agende seu próximo horário.</Text>
        </View>

        <View style={styles.headerIconBox}>
          <MaterialCommunityIcons name="calendar-month-outline" size={54} color="#D8EEE5" />
        </View>
      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 128 + insets.bottom }]}
      >
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.schedulingButton}
          onPress={handleSchedulingPress}
        >
          <MaterialCommunityIcons name="calendar-plus-outline" size={24} color="#FFF8EF" />
          <Text style={styles.schedulingButtonText}>Agendar horário</Text>
        </TouchableOpacity>

        <View style={styles.appointmentsSection}>
          <Text style={styles.sectionTitle}>Próximos agendamentos</Text>

          {loadingAppointments ? (
            <View style={styles.feedbackBox}>
              <ActivityIndicator color="#2F6B5F" />
            </View>
          ) : appointmentsError ? (
            <View style={styles.feedbackBox}>
              <Text style={styles.feedbackText}>{appointmentsError}</Text>
            </View>
          ) : upcomingAppointments.length === 0 ? (
            <View style={styles.feedbackBox}>
              <View style={styles.emptyIconBox}>
                <MaterialCommunityIcons name="calendar-blank-outline" size={34} color="#2F6B5F" />
              </View>
              <Text style={styles.emptyTitle}>Nenhum horário agendado</Text>
              <Text style={styles.feedbackText}>Seu próximo agendamento aparecerá aqui.</Text>
            </View>
          ) : (
            <View style={styles.appointmentsList}>
              {upcomingAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment._id}
                  appointment={appointment}
                  onPress={setSelectedAppointment}
                  onCancel={handleCancelAppointment}
                  cancelLoading={cancelingAppointmentId === appointment._id}
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      <AppointmentPopup
        visible={Boolean(selectedAppointment)}
        appointment={selectedAppointment}
        onClose={() => setSelectedAppointment(null)}
      />
    </View>
  );
}

