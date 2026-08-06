import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { BarberStepCard } from '../../components/cards/scheduling/BarberStepCard';
import { DateStepCard } from '../../components/cards/scheduling/DateStepCard';
import { ServiceStepCard } from '../../components/cards/scheduling/ServiceStepCard';
import { TimeStepCard } from '../../components/cards/scheduling/TimeStepCard';
import { ConfirmSchedulingPopup } from '../../components/popups/scheduling/ConfirmSchedulingPopup';
import {
  createAppointment,
  getAppointmentsByBarberDate,
  getAvailabilityByBarber,
  getBarbers,
  getBlockedSlotsByBarber,
  getBlockedSlotsByDate,
  getServicesByBarber,
} from '../../services/schedulingService';
import type { RootStackParamList } from '../../types/navigation';
import type { Availability, Barber, BlockedSlot, SchedulingStep, Service } from '../../types/scheduling';
import {
  filterUnavailableSlots,
  generateSlotsForDate,
  getEntityId,
  getEntityName,
} from '../../utils/scheduling';
import { styles } from './styles';

type SchedulingScreenProps = NativeStackScreenProps<RootStackParamList, 'Scheduling'>;

const steps: SchedulingStep[] = ['barber', 'date', 'time', 'service'];
const stepLabels = {
  barber: 'Barbeiro',
  date: 'Dia',
  time: 'Horário',
  service: 'Serviço',
};

export default function SchedulingScreen({ navigation, route }: SchedulingScreenProps) {
  const auth = route.params;
  const userId = auth?.user?._id || auth?.user?.id;
  const [currentStep, setCurrentStep] = useState<SchedulingStep>('barber');
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [blockedSlots, setBlockedSlots] = useState<BlockedSlot[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [times, setTimes] = useState<string[]>([]);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [loadingBarbers, setLoadingBarbers] = useState(false);
  const [loadingTimes, setLoadingTimes] = useState(false);
  const [loadingServices, setLoadingServices] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const currentStepIndex = steps.indexOf(currentStep);

  const progressDots = useMemo(
    () => steps.map((_, index) => (index <= currentStepIndex ? '●' : '○')).join(' '),
    [currentStepIndex]
  );

  useEffect(() => {
    async function loadBarbers() {
      try {
        setError('');
        setLoadingBarbers(true);
        const result = await getBarbers();
        setBarbers(result);
      } catch {
        setError('Não foi possível carregar os barbeiros.');
      } finally {
        setLoadingBarbers(false);
      }
    }

    loadBarbers();
  }, []);

  async function handleSelectBarber(barber: Barber) {
    const barberId = getEntityId(barber);

    try {
      setError('');
      setSelectedBarber(barber);
      setSelectedDate('');
      setSelectedTime('');
      setSelectedService(null);
      setTimes([]);
      setLoadingServices(true);
      const [availabilityResult, blockedSlotsResult, servicesResult] = await Promise.all([
        getAvailabilityByBarber(barberId),
        getBlockedSlotsByBarber(barberId),
        getServicesByBarber(barberId),
      ]);
      setAvailabilities(availabilityResult);
      setBlockedSlots(blockedSlotsResult);
      setServices(servicesResult);
      setCurrentStep('date');
    } catch {
      setError('Não foi possível carregar a agenda desse barbeiro.');
    } finally {
      setLoadingServices(false);
    }
  }

  async function handleSelectDate(date: string) {
    if (!selectedBarber) return;

    const barberId = getEntityId(selectedBarber);

    try {
      setError('');
      setSelectedDate(date);
      setSelectedTime('');
      setSelectedService(null);
      setCurrentStep('time');
      setLoadingTimes(true);

      const [blockedSlots, appointments] = await Promise.all([
        getBlockedSlotsByDate(barberId, date),
        getAppointmentsByBarberDate(barberId, date),
      ]);
      const generatedSlots = generateSlotsForDate(date, availabilities);
      const availableSlots = filterUnavailableSlots(generatedSlots, blockedSlots, appointments);
      setTimes(availableSlots);
    } catch {
      setError('Não foi possível carregar os horários disponíveis.');
      setTimes([]);
    } finally {
      setLoadingTimes(false);
    }
  }

  function handleSelectTime(time: string) {
    setSelectedTime(time);
    setSelectedService(null);
    setCurrentStep('service');
  }

  function handleSelectService(service: Service) {
    setSelectedService(service);
    setConfirmVisible(true);
  }

  function handleBack() {
    setError('');

    if (currentStep === 'service') {
      setSelectedService(null);
      setCurrentStep('time');
      return;
    }

    if (currentStep === 'time') {
      setSelectedTime('');
      setCurrentStep('date');
      return;
    }

    if (currentStep === 'date') {
      setSelectedDate('');
      setAvailabilities([]);
      setBlockedSlots([]);
      setServices([]);
      setSelectedBarber(null);
      setCurrentStep('barber');
      return;
    }

    navigation.goBack();
  }

  async function handleConfirmScheduling() {
    if (!selectedBarber || !selectedDate || !selectedTime || !selectedService || !userId) {
      setError('Revise as informações antes de confirmar.');
      return;
    }

    try {
      setError('');
      setConfirmLoading(true);
      await createAppointment({
        userId,
        barberId: getEntityId(selectedBarber),
        serviceId: selectedService._id,
        date: selectedDate,
        time: selectedTime,
        status: 'confirmed',
        price: selectedService.price,
      });
      setSuccess(true);

      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'UserTabs', params: auth }],
        });
      }, 1200);
    } catch {
      setError('Não foi possível confirmar o agendamento.');
      setConfirmVisible(false);
    } finally {
      setConfirmLoading(false);
    }
  }

  function renderStep() {
    if (currentStep === 'barber') {
      return (
        <BarberStepCard
          barbers={barbers}
          loading={loadingBarbers}
          onSelect={handleSelectBarber}
        />
      );
    }

    if (currentStep === 'date') {
      return (
        <DateStepCard
          availabilities={availabilities}
          blockedSlots={blockedSlots}
          onSelect={handleSelectDate}
        />
      );
    }

    if (currentStep === 'time') {
      return (
        <TimeStepCard
          times={times}
          loading={loadingTimes}
          onSelect={handleSelectTime}
        />
      );
    }

    return (
      <ServiceStepCard
        services={services}
        loading={loadingServices}
        onSelect={handleSelectService}
      />
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Agendamento</Text>
          <Text style={styles.progress}>{progressDots}</Text>
          <Text style={styles.stepLabel}>{stepLabels[currentStep]}</Text>
        </View>

        {selectedBarber && (
          <View style={styles.summaryBar}>
            <Text style={styles.summaryText}>Barbeiro: {getEntityName(selectedBarber)}</Text>
            {selectedDate && <Text style={styles.summaryText}>Dia: {selectedDate}</Text>}
            {selectedTime && <Text style={styles.summaryText}>Hora: {selectedTime}</Text>}
          </View>
        )}

        {error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {renderStep()}

        <TouchableOpacity activeOpacity={0.85} style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </ScrollView>

      <ConfirmSchedulingPopup
        visible={confirmVisible}
        barber={selectedBarber}
        date={selectedDate}
        time={selectedTime}
        service={selectedService}
        loading={confirmLoading}
        success={success}
        onCancel={() => setConfirmVisible(false)}
        onConfirm={handleConfirmScheduling}
      />
    </View>
  );
}
