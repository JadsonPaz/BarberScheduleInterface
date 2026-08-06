import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BlockedSlotCard from '../../../../../components/cards/blockedSlotCard';
import { ScreenHeader } from '../../../../../components/headers/ScreenHeader';
import BlockedSlotPopup, {
  type BlockedSlotEditDraft,
} from '../../../../../components/popups/blockedSlotPopup';
import {
  deleteBlockedSlot,
  getBlockedSlotsByBarber,
  updateBlockedSlot,
} from '../../../../../services/schedulingService';
import type { BlockedSlot } from '../../../../../types/scheduling';
import type { RootStackParamList } from '../../../../../types/navigation';
import { styles } from './styles';

type BlockedSlotsProps = NativeStackScreenProps<RootStackParamList, 'BlockedSlots'>;

const timeOptions = [
  '06:00',
  '06:30',
  '07:00',
  '07:30',
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
  '21:30',
  '22:00',
];

function getMinutes(time: string) {
  const [hour, minute] = time.split(':').map(Number);
  return hour * 60 + minute;
}

export default function BlockedSlots({ navigation, route }: BlockedSlotsProps) {
  const insets = useSafeAreaInsets();
  const barberId = route.params?.user.id || route.params?.user._id;
  const [blockedSlots, setBlockedSlots] = useState<BlockedSlot[]>([]);
  const [selectedBlockedSlot, setSelectedBlockedSlot] = useState<BlockedSlot | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');

  const loadBlockedSlots = useCallback(async () => {
    if (!barberId) {
      setError('Não foi possível identificar o barbeiro logado.');
      setIsLoading(false);
      return;
    }

    try {
      setError('');
      const data = await getBlockedSlotsByBarber(barberId);
      setBlockedSlots(data);
    } catch {
      setError('Não foi possível carregar os horários bloqueados.');
    } finally {
      setIsLoading(false);
    }
  }, [barberId]);

  useEffect(() => {
    loadBlockedSlots();
  }, [loadBlockedSlots]);

  useFocusEffect(
    useCallback(() => {
      loadBlockedSlots();
    }, [loadBlockedSlots])
  );

  async function handleSave(draft: BlockedSlotEditDraft) {
    if (!selectedBlockedSlot) return;

    const isRecurring =
      selectedBlockedSlot.weekday !== undefined && selectedBlockedSlot.weekday !== null;

    if (!isRecurring && !draft.date) {
      Alert.alert('Data obrigatória', 'Informe a data do bloqueio.');
      return;
    }

    if ((!draft.isFullDay || isRecurring) && getMinutes(draft.endTime) <= getMinutes(draft.startTime)) {
      Alert.alert('Horário inválido', 'O horário final precisa ser maior que o inicial.');
      return;
    }

    setIsSaving(true);

    try {
      await updateBlockedSlot(selectedBlockedSlot._id, {
        ...(isRecurring
          ? { weekday: draft.weekday, startTime: draft.startTime, endTime: draft.endTime }
          : {
            date: draft.date,
            isFullDay: draft.isFullDay,
            startTime: draft.isFullDay ? undefined : draft.startTime,
            endTime: draft.isFullDay ? undefined : draft.endTime,
          }),
        reason: draft.reason,
      });

      await loadBlockedSlots();
      setSelectedBlockedSlot(null);
    } catch {
      Alert.alert('Bloqueio', 'Não foi possível salvar o bloqueio.');
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    if (!selectedBlockedSlot) return;

    setIsDeleting(true);

    try {
      await deleteBlockedSlot(selectedBlockedSlot._id);
      await loadBlockedSlots();
      setSelectedBlockedSlot(null);
    } catch {
      Alert.alert('Bloqueio', 'Não foi possível excluir o bloqueio.');
    } finally {
      setIsDeleting(false);
    }
  }

  function handleBackToProfile() {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'AdminTabs',
            params: {
              screen: 'UserAdm',
              params: route.params,
            },
          },
        ],
      })
    );
  }

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Horários bloqueados"
        subtitle="Veja e gerencie períodos indisponíveis para agendamento."
        onBack={handleBackToProfile}
      />

      {isLoading ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator color="#2F6B5F" />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={[styles.listContent, { paddingBottom: 132 + insets.bottom }]}
          showsVerticalScrollIndicator={false}
        >
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {blockedSlots.length ? (
            blockedSlots.map((blockedSlot) => (
              <BlockedSlotCard
                key={blockedSlot._id}
                blockedSlot={blockedSlot}
                onPress={() => setSelectedBlockedSlot(blockedSlot)}
              />
            ))
          ) : (
            <Text style={styles.emptyText}>Nenhum horário bloqueado ainda.</Text>
          )}
        </ScrollView>
      )}

      <TouchableOpacity
        activeOpacity={0.86}
        style={[styles.floatingButton, { bottom: 26 + insets.bottom }]}
        onPress={() => navigation.navigate('NewBlockedSlot', route.params)}
      >
        <Text style={styles.floatingButtonText}>+ Novo Bloqueio</Text>
      </TouchableOpacity>

      <BlockedSlotPopup
        visible={Boolean(selectedBlockedSlot)}
        blockedSlot={selectedBlockedSlot}
        timeOptions={timeOptions}
        isSaving={isSaving}
        isDeleting={isDeleting}
        onClose={() => setSelectedBlockedSlot(null)}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </View>
  );
}


