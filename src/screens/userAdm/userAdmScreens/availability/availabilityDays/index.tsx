import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import AvailabilityDayCard from '../../../../../components/cards/availabilityCard';
import { ScreenHeader } from '../../../../../components/headers/ScreenHeader';
import AvailabilityEditorPopup, {
  type AvailabilityDraft,
} from '../../../../../components/popups/availabilityPopup';
import {
  createAvailability,
  deleteAvailability,
  getAvailabilityByBarber,
  updateAvailability,
} from '../../../../../services/schedulingService';
import type { Availability } from '../../../../../types/scheduling';
import type { RootStackParamList } from '../../../../../types/navigation';
import { styles } from './styles';

type AvailabilityDaysProps = NativeStackScreenProps<RootStackParamList, 'AvailabilityDays'>;

const weekdays = [
  { label: 'Segunda', weekday: 1 },
  { label: 'Terça',   weekday: 2 },
  { label: 'Quarta',  weekday: 3 },
  { label: 'Quinta',  weekday: 4 },
  { label: 'Sexta',   weekday: 5 },
  { label: 'Sábado',  weekday: 6 },
  { label: 'Domingo', weekday: 0 },
];

const timeOptions = [
  '06:00','06:30','07:00','07:30','08:00','08:30','09:00','09:30',
  '10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30',
  '14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30',
  '18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30','22:00',
];

const durationOptions = [15, 30, 45, 60, 90, 120];

const defaultDraft: AvailabilityDraft = {
  startTime: '08:00',
  endTime: '18:00',
  slotDuration: 60,
};

function getMinutes(time: string) {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

export default function AvailabilityDays({ navigation, route }: AvailabilityDaysProps) {
  const barberId = route.params?.user.id || route.params?.user._id;

  const [availability, setAvailability]         = useState<Availability[]>([]);
  const [isLoading, setIsLoading]               = useState(true);
  const [isSaving, setIsSaving]                 = useState(false);
  const [loadingWeekday, setLoadingWeekday]     = useState<number | null>(null);
  const [selectedWeekday, setSelectedWeekday]   = useState<number | null>(null);
  const [draft, setDraft]                       = useState<AvailabilityDraft>(defaultDraft);
  const [error, setError]                       = useState('');

  const byWeekday = useMemo(
    () => availability.reduce<Record<number, Availability>>((acc, item) => {
      acc[item.weekday] = item;
      return acc;
    }, {}),
    [availability],
  );

  const loadAvailability = useCallback(async () => {
    if (!barberId) {
      setError('Não foi possível identificar o barbeiro logado.');
      setIsLoading(false);
      return;
    }
    try {
      setError('');
      setAvailability(await getAvailabilityByBarber(barberId));
    } catch {
      setError('Não foi possível carregar sua disponibilidade.');
    } finally {
      setIsLoading(false);
    }
  }, [barberId]);

  useEffect(() => { loadAvailability(); }, [loadAvailability]);

  // Abre o editor com os dados atuais ou defaults
  function openEditor(weekday: number) {
    const current = byWeekday[weekday];
    setDraft(current
      ? { startTime: current.startTime, endTime: current.endTime, slotDuration: current.slotDuration ?? defaultDraft.slotDuration }
      : defaultDraft,
    );
    setSelectedWeekday(weekday);
  }

  async function handleToggle(weekday: number) {
    if (!barberId || loadingWeekday !== null) return;
    const current = byWeekday[weekday];
    setLoadingWeekday(weekday);
    try {
      setError('');
      if (current) {
        await deleteAvailability(current._id);
      } else {
        await createAvailability({ barberId, weekday, ...defaultDraft });
      }
      await loadAvailability();
    } catch {
      Alert.alert('Disponibilidade', 'Não foi possível atualizar esse dia.');
    } finally {
      setLoadingWeekday(null);
    }
  }

  async function handleSave() {
    if (!barberId || selectedWeekday === null) return;
    if (getMinutes(draft.endTime) <= getMinutes(draft.startTime)) {
      Alert.alert('Horário inválido', 'O horário final precisa ser maior que o inicial.');
      return;
    }
    const current = byWeekday[selectedWeekday];
    setIsSaving(true);
    try {
      if (current) {
        await updateAvailability(current._id, draft);
      } else {
        await createAvailability({ barberId, weekday: selectedWeekday, ...draft });
      }
      await loadAvailability();
      setSelectedWeekday(null);
    } catch {
      Alert.alert('Disponibilidade', 'Não foi possível salvar os horários.');
    } finally {
      setIsSaving(false);
    }
  }

  const selectedLabel = weekdays.find(d => d.weekday === selectedWeekday)?.label;

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Gerenciar dias e horários"
        subtitle="Ative os dias de atendimento e ajuste os horários de cada um."
        onBack={navigation.goBack}
      />

      {isLoading ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator color="#2F6B5F" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {weekdays.map(({ label, weekday }) => (
            <AvailabilityDayCard
              key={weekday}
              label={label}
              availability={byWeekday[weekday]}
              isToggling={loadingWeekday === weekday}
              onPress={() => openEditor(weekday)}  
              onToggle={() => handleToggle(weekday)}
            />
          ))}
        </ScrollView>
      )}

      <AvailabilityEditorPopup
        visible={selectedWeekday !== null}
        dayLabel={selectedLabel}
        draft={draft}
        timeOptions={timeOptions}
        durationOptions={durationOptions}
        isSaving={isSaving}
        onClose={() => setSelectedWeekday(null)}
        onSave={handleSave}
        onChangeDraft={setDraft}
      />
    </View>
  );
}