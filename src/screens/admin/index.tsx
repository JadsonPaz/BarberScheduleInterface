import React, { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DayPickerPopup } from '../../components/adminDayPicker/DayPickerPopup';
import { DaySelectorCard } from '../../components/adminDayPicker/DaySelectorCard';
import { AppointmentCard } from '../../components/cards/appointmentsCads';
import { AppointmentPopup } from '../../components/popups/cardPopup';
import { getAppointmentsByBarber, updateAppointmentStatus } from '../../services/appointmentsService';
import type { Appointment, AppointmentStatus } from '../../types/appointments';
import type { AdminBottomTabParamList, RootStackParamList } from '../../types/navigation';
import { getAppointmentPrice } from '../../utils/appointments';
import { styles } from './styles';

type AdminScreenProps = BottomTabScreenProps<AdminBottomTabParamList, 'Admin'>;

function formatDateToApi(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function formatDateShort(date: Date) {
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
  });
}

function formatDateLong(date: Date) {
  return date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
  });
}

function getAppointmentDateOnly(date: string) {
  return date.includes('T') ? date.split('T')[0] : date;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

function sumAppointmentPrices(appointments: Appointment[]) {
  return appointments.reduce((total, appointment) => {
    const price = getAppointmentPrice(appointment);
    return total + (typeof price === 'number' ? price : 0);
  }, 0);
}

export default function AdminScreen({ navigation, route }: AdminScreenProps) {
  const insets = useSafeAreaInsets();
  const barber = route.params?.user;
  const barberId = barber?._id || barber?.id;
  const displayName = barber?.fullname || barber?.name || 'Barbeiro';
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [dayPickerVisible, setDayPickerVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(false);
  const [updatingAppointmentId, setUpdatingAppointmentId] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<AppointmentStatus | null>(null);
  const [error, setError] = useState('');

  const selectedDateKey = useMemo(() => formatDateToApi(selectedDate), [selectedDate]);
  const selectedDateShort = useMemo(() => formatDateShort(selectedDate), [selectedDate]);
  const selectedDateLong = useMemo(() => formatDateLong(selectedDate), [selectedDate]);
  const selectedDateAppointments = useMemo(
    () =>
      appointments.filter(
        (appointment) =>
          getAppointmentDateOnly(appointment.date) === selectedDateKey &&
          appointment.status.toLowerCase() !== 'cancelled'
      ),
    [appointments, selectedDateKey]
  );
  const finalSelectedDateAppointments = useMemo(
    () => selectedDateAppointments.filter((appointment) => appointment.status === 'done'),
    [selectedDateAppointments]
  );
  const estimatedProfit = useMemo(
    () => sumAppointmentPrices(selectedDateAppointments),
    [selectedDateAppointments]
  );
  const finalProfit = useMemo(
    () => sumAppointmentPrices(finalSelectedDateAppointments),
    [finalSelectedDateAppointments]
  );

  const loadAppointments = useCallback(async () => {
    if (!barberId) return;

    try {
      setError('');
      setLoading(true);
      const result = await getAppointmentsByBarber(barberId);
      setAppointments(result);
    } catch {
      setError('Não foi possível carregar os agendamentos.');
    } finally {
      setLoading(false);
    }
  }, [barberId]);

  useFocusEffect(
    useCallback(() => {
      loadAppointments();
    }, [loadAppointments])
  );

  function handleDashboardPress() {
    navigation
      .getParent<NativeStackNavigationProp<RootStackParamList>>()
      ?.navigate('Dashboard', route.params);
  }

  async function handleStatusChange(appointment: Appointment, status: AppointmentStatus) {
    try {
      setError('');
      setUpdatingAppointmentId(appointment._id);
      setUpdatingStatus(status);
      const updatedAppointment = await updateAppointmentStatus(appointment._id, status);

      setAppointments((currentAppointments) =>
        currentAppointments.map((currentAppointment) =>
          currentAppointment._id === appointment._id
            ? updatedAppointment ?? { ...currentAppointment, status }
            : currentAppointment
        )
      );

      if (selectedAppointment?._id === appointment._id) {
        setSelectedAppointment(updatedAppointment ?? { ...appointment, status });
      }
    } catch {
      setError('Não foi possível atualizar o status do agendamento.');
    } finally {
      setUpdatingAppointmentId(null);
      setUpdatingStatus(null);
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
          <Text style={styles.greeting}>Bem vindo, {displayName}</Text>
          <Text style={styles.subtitle}>Confira sua agenda por dia.</Text>
        </View>

        <View style={styles.headerIconBox}>
          <MaterialCommunityIcons name="calendar-clock-outline" size={54} color="#D8EEE5" />
        </View>
      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 128 + insets.bottom }]}
      >
        <View style={styles.appointmentsSection}>
          <Text style={styles.sectionTitle}>Agendamentos - {selectedDateShort}</Text>

          <DaySelectorCard
            selectedDateLabel={selectedDateLong}
            onPress={() => setDayPickerVisible(true)}
          />

          {loading ? (
            <View style={styles.feedbackBox}>
              <ActivityIndicator color="#2F6B5F" />
            </View>
          ) : error ? (
            <View style={styles.feedbackBox}>
              <Text style={styles.feedbackText}>{error}</Text>
            </View>
          ) : selectedDateAppointments.length === 0 ? (
            <View style={styles.feedbackBox}>
              <View style={styles.emptyIconBox}>
                <MaterialCommunityIcons name="calendar-blank-outline" size={34} color="#2F6B5F" />
              </View>
              <Text style={styles.emptyTitle}>Nenhum agendamento em {selectedDateShort}</Text>
              <Text style={styles.feedbackText}>Os agendamentos do dia selecionado aparecerão aqui.</Text>
            </View>
          ) : (
            selectedDateAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment._id}
                appointment={appointment}
                onPress={setSelectedAppointment}
                onStatusChange={handleStatusChange}
                statusLoading={updatingAppointmentId === appointment._id ? updatingStatus : null}
                readonly={false}
                showClientName
              />
            ))
          )}
        </View>

        <View style={styles.profitSection}>
          <View style={styles.profitBox}>
            <Text style={styles.profitTitle}>Lucro estimado - {selectedDateShort}</Text>

            <View style={styles.profitRow}>
              <Text style={styles.profitLabel}>Lucro estimado:</Text>
              <Text style={styles.profitValue}>{formatCurrency(estimatedProfit)}</Text>
            </View>

            <View style={styles.profitDivider} />

            <View style={styles.profitRow}>
              <Text style={styles.profitLabel}>Lucro final:</Text>
              <Text style={styles.profitValue}>{formatCurrency(finalProfit)}</Text>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.financialButton}
            onPress={handleDashboardPress}
          >
            <MaterialCommunityIcons name="chart-line" size={24} color="#FFF8EF" />
            <Text style={styles.financialButtonText}>Painel financeiro</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <DayPickerPopup
        visible={dayPickerVisible}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        onClose={() => setDayPickerVisible(false)}
      />

      <AppointmentPopup
        visible={Boolean(selectedAppointment)}
        appointment={selectedAppointment}
        onClose={() => setSelectedAppointment(null)}
      />
    </View>
  );
}

