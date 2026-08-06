import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FinancialHeroCard, type MonthOption } from '../../../components/financialDashboard/FinancialHeroCard';
import { MonthPickerPopup } from '../../../components/financialDashboard/MonthPickerPopup';
import { ServiceRankingList, type ServiceRankingItem } from '../../../components/financialDashboard/ServiceRankingList';
import { ScreenHeader } from '../../../components/headers/ScreenHeader';
import { getAppointmentsByBarber } from '../../../services/appointmentsService';
import type { Appointment } from '../../../types/appointments';
import type { RootStackParamList } from '../../../types/navigation';
import { getAppointmentPrice, getAppointmentServiceName } from '../../../utils/appointments';
import { styles } from './styles';

type DashboardProps = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

type ServiceStats = {
  id: string;
  name: string;
  count: number;
  revenue: number;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

function isValidDate(date: Date) {
  return !Number.isNaN(date.getTime());
}

function getMonthKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return year + '-' + month;
}

function getMonthLabel(date: Date) {
  return date.toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric',
  });
}

function getShortMonthLabel(date: Date) {
  const label = date.toLocaleDateString('pt-BR', {
    month: 'short',
    year: '2-digit',
  });

  return label.replace('.', '');
}

function getMonthOptions(startDate: Date, endDate: Date): MonthOption[] {
  const cursor = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
  const end = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
  const options: MonthOption[] = [];

  while (cursor <= end) {
    options.push({
      key: getMonthKey(cursor),
      label: getMonthLabel(cursor),
      shortLabel: getShortMonthLabel(cursor),
    });

    cursor.setMonth(cursor.getMonth() + 1);
  }

  return options;
}

function getAppointmentMonthKey(appointment: Appointment) {
  const parsedDate = new Date(appointment.date);
  return isValidDate(parsedDate) ? getMonthKey(parsedDate) : '';
}

function getServiceId(appointment: Appointment) {
  if (typeof appointment.serviceId === 'string') return appointment.serviceId;
  return appointment.serviceId?._id ?? getAppointmentServiceName(appointment);
}

function getUniqueClientCount(appointments: Appointment[]) {
  const clientIds = new Set<string>();

  appointments.forEach((appointment) => {
    const client = appointment.userId;
    const clientId = typeof client === 'string' ? client : client?._id;

    if (clientId) {
      clientIds.add(clientId);
    }
  });

  return clientIds.size;
}

function getServiceRanking(appointments: Appointment[]): ServiceRankingItem[] {
  const statsMap = new Map<string, ServiceStats>();

  appointments.forEach((appointment) => {
    const id = getServiceId(appointment);
    const name = getAppointmentServiceName(appointment);
    const price = getAppointmentPrice(appointment) ?? 0;
    const current = statsMap.get(id);

    if (current) {
      current.count += 1;
      current.revenue += price;
      return;
    }

    statsMap.set(id, {
      id,
      name,
      count: 1,
      revenue: price,
    });
  });

  return Array.from(statsMap.values())
    .sort((a, b) => b.count - a.count || b.revenue - a.revenue || a.name.localeCompare(b.name))
    .map((item) => ({
      ...item,
      revenue: formatCurrency(item.revenue),
    }));
}

export default function Dashboard({ navigation, route }: DashboardProps) {
  const insets = useSafeAreaInsets();
  const barber = route.params?.user;
  const barberId = barber?._id || barber?.id;
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedMonthKey, setSelectedMonthKey] = useState(getMonthKey(new Date()));
  const [monthPickerVisible, setMonthPickerVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const monthOptions = useMemo(() => {
    const now = new Date();
    const createdAt = barber?.createdAt ? new Date(barber.createdAt) : null;
    const firstAppointmentDate = appointments.length
      ? appointments
          .map((appointment) => new Date(appointment.date))
          .filter(isValidDate)
          .sort((a, b) => a.getTime() - b.getTime())[0]
      : null;
    const startDate = createdAt && isValidDate(createdAt)
      ? createdAt
      : firstAppointmentDate && isValidDate(firstAppointmentDate)
        ? firstAppointmentDate
        : now;

    return getMonthOptions(startDate, now);
  }, [appointments, barber?.createdAt]);

  const selectedMonthLabel = useMemo(
    () => monthOptions.find((month) => month.key === selectedMonthKey)?.label ?? 'mes atual',
    [monthOptions, selectedMonthKey]
  );

  const completedMonthAppointments = useMemo(
    () => appointments.filter(
      (appointment) =>
        appointment.status === 'done' && getAppointmentMonthKey(appointment) === selectedMonthKey
    ),
    [appointments, selectedMonthKey]
  );

  const monthRevenue = useMemo(
    () => completedMonthAppointments.reduce(
      (total, appointment) => total + (getAppointmentPrice(appointment) ?? 0),
      0
    ),
    [completedMonthAppointments]
  );

  const clientsAttended = useMemo(
    () => getUniqueClientCount(completedMonthAppointments),
    [completedMonthAppointments]
  );

  const serviceRanking = useMemo(
    () => getServiceRanking(completedMonthAppointments),
    [completedMonthAppointments]
  );

  const loadAppointments = useCallback(async () => {
    if (!barberId) {
      setError('Nao foi possivel identificar o barbeiro logado.');
      setIsLoading(false);
      return;
    }

    try {
      setError('');
      setIsLoading(true);
      const result = await getAppointmentsByBarber(barberId);
      setAppointments(result);
    } catch {
      setError('Nao foi possivel carregar o painel financeiro.');
    } finally {
      setIsLoading(false);
    }
  }, [barberId]);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  useFocusEffect(
    useCallback(() => {
      loadAppointments();
    }, [loadAppointments])
  );

  useEffect(() => {
    if (monthOptions.length && !monthOptions.some((month) => month.key === selectedMonthKey)) {
      setSelectedMonthKey(monthOptions[monthOptions.length - 1].key);
    }
  }, [monthOptions, selectedMonthKey]);

  return (
    <View style={[styles.container, { paddingTop: insets.top + 14 }]}>
      <ScreenHeader
        title="Painel financeiro"
        subtitle={'Resumo de faturamento e servicos em ' + selectedMonthLabel + '.'}
        onBack={navigation.goBack}
      />

      {isLoading ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator color="#2F6B5F" />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.content, { paddingBottom: 34 + insets.bottom }]}
        >
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <FinancialHeroCard
            selectedMonthLabel={selectedMonthLabel}
            revenue={formatCurrency(monthRevenue)}
            clientsCount={clientsAttended}
            onOpenMonthPicker={() => setMonthPickerVisible(true)}
          />

          <ServiceRankingList items={serviceRanking} />
        </ScrollView>
      )}

      <MonthPickerPopup
        visible={monthPickerVisible}
        months={monthOptions}
        selectedMonthKey={selectedMonthKey}
        onSelectMonth={setSelectedMonthKey}
        onClose={() => setMonthPickerVisible(false)}
      />
    </View>
  );
}
