import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import BlockedSlotFormCard from '../../../../../../components/cards/blockedSlotFormCard';
import { createBlockedSlot } from '../../../../../../services/schedulingService';
import type { RootStackParamList } from '../../../../../../types/navigation';
import { styles } from './styles';

type NewBlockedSlotProps = NativeStackScreenProps<RootStackParamList, 'NewBlockedSlot'>;
type BlockType = 'specific' | 'weekly';

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

const weekdayOptions = [
  { label: 'Domingo', value: 0 },
  { label: 'Segunda', value: 1 },
  { label: 'Terça', value: 2 },
  { label: 'Quarta', value: 3 },
  { label: 'Quinta', value: 4 },
  { label: 'Sexta', value: 5 },
  { label: 'Sábado', value: 6 },
];

function getMinutes(time: string) {
  const [hour, minute] = time.split(':').map(Number);
  return hour * 60 + minute;
}

function toIsoDate(value: string) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }

  const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

  if (!match) {
    return '';
  }

  const [, day, month, year] = match;
  return `${year}-${month}-${day}`;
}

export default function NewBlockedSlot({ navigation, route }: NewBlockedSlotProps) {
  const barberId = route.params?.user.id || route.params?.user._id;
  const [blockType, setBlockType] = useState<BlockType | null>(null);
  const [date, setDate] = useState('');
  const [isFullDay, setIsFullDay] = useState(true);
  const [weekday, setWeekday] = useState(1);
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('18:00');
  const [reason, setReason] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  async function handleSave() {
    if (!barberId || !blockType) {
      return;
    }

    if ((!isFullDay || blockType === 'weekly') && getMinutes(endTime) <= getMinutes(startTime)) {
      Alert.alert('Horário inválido', 'O horário final precisa ser maior que o inicial.');
      return;
    }

    const isoDate = toIsoDate(date.trim());

    if (blockType === 'specific' && !isoDate) {
      Alert.alert('Data inválida', 'Informe a data no formato DD/MM/AAAA.');
      return;
    }

    setIsSaving(true);

    try {
      await createBlockedSlot(
        blockType === 'specific'
          ? {
              barberId,
              date: isoDate,
              isFullDay,
              ...(isFullDay ? {} : { startTime, endTime }),
              reason,
            }
          : {
              barberId,
              weekday,
              startTime,
              endTime,
              reason,
            }
      );

      Alert.alert('Bloqueio criado', 'O novo bloqueio foi salvo com sucesso.');
      navigation.navigate('BlockedSlots', route.params);
    } catch {
      Alert.alert('Bloqueio', 'Não foi possível criar o bloqueio.');
    } finally {
      setIsSaving(false);
    }
  }

  function renderTimeOptions(type: 'start' | 'end') {
    const selectedTime = type === 'start' ? startTime : endTime;
    const onSelect = type === 'start' ? setStartTime : setEndTime;

    return (
      <View style={styles.optionGrid}>
        {timeOptions.map((time) => (
          <TouchableOpacity
            key={`${type}-${time}`}
            activeOpacity={0.82}
            style={[styles.timeChip, selectedTime === time && styles.chipActive]}
            onPress={() => onSelect(time)}
          >
            <Text style={[styles.chipText, selectedTime === time && styles.chipTextActive]}>
              {time}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo bloqueio</Text>
      <Text style={styles.subtitle}>Escolha o tipo de bloqueio e preencha as informações.</Text>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <BlockedSlotFormCard title="O que deseja bloquear?">
          <TouchableOpacity
            activeOpacity={0.86}
            style={[styles.typeOption, blockType === 'specific' && styles.typeOptionActive]}
            onPress={() => setBlockType('specific')}
          >
            <View style={[styles.radio, blockType === 'specific' && styles.radioActive]} />
            <Text style={styles.typeText}>Data específica</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.86}
            style={[styles.typeOption, blockType === 'weekly' && styles.typeOptionActive]}
            onPress={() => setBlockType('weekly')}
          >
            <View style={[styles.radio, blockType === 'weekly' && styles.radioActive]} />
            <Text style={styles.typeText}>Toda semana</Text>
          </TouchableOpacity>
        </BlockedSlotFormCard>

        {blockType === 'specific' ? (
          <BlockedSlotFormCard title="Data específica" subtitle="Bloqueie uma data inteira ou apenas um intervalo.">
            <Text style={styles.label}>Data</Text>
            <TextInput
              value={date}
              onChangeText={setDate}
              placeholder="20/08/2025"
              keyboardType="numbers-and-punctuation"
              style={styles.input}
            />

            <TouchableOpacity
              activeOpacity={0.82}
              style={styles.checkboxRow}
              onPress={() => setIsFullDay((current) => !current)}
            >
              <View style={[styles.checkbox, isFullDay && styles.checkboxActive]}>
                <Text style={styles.checkboxMark}>{isFullDay ? '✓' : ''}</Text>
              </View>
              <Text style={styles.checkboxText}>Dia inteiro</Text>
            </TouchableOpacity>

            {!isFullDay ? (
              <>
                <Text style={styles.label}>Horário inicial</Text>
                {renderTimeOptions('start')}

                <Text style={styles.label}>Horário final</Text>
                {renderTimeOptions('end')}
              </>
            ) : null}

            <Text style={styles.label}>Motivo</Text>
            <TextInput
              value={reason}
              onChangeText={setReason}
              placeholder="Opcional"
              style={styles.input}
            />
          </BlockedSlotFormCard>
        ) : null}

        {blockType === 'weekly' ? (
          <BlockedSlotFormCard title="Toda semana" subtitle="Bloqueie um horário recorrente em um dia da semana.">
            <Text style={styles.label}>Dia da semana</Text>
            <View style={styles.weekdayGrid}>
              {weekdayOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  activeOpacity={0.82}
                  style={[styles.weekdayChip, weekday === option.value && styles.chipActive]}
                  onPress={() => setWeekday(option.value)}
                >
                  <Text style={[styles.chipText, weekday === option.value && styles.chipTextActive]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Horário inicial</Text>
            {renderTimeOptions('start')}

            <Text style={styles.label}>Horário final</Text>
            {renderTimeOptions('end')}

            <Text style={styles.label}>Motivo</Text>
            <TextInput
              value={reason}
              onChangeText={setReason}
              placeholder="Opcional"
              style={styles.input}
            />
          </BlockedSlotFormCard>
        ) : null}

        {blockType ? (
          <View style={styles.actions}>
            <TouchableOpacity
              activeOpacity={0.82}
              style={styles.backButton}
              onPress={() => setBlockType(null)}
              disabled={isSaving}
            >
              <Text style={styles.backButtonText}>Voltar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.82}
              style={styles.saveButton}
              onPress={handleSave}
              disabled={isSaving}
            >
              {isSaving ? (
                <ActivityIndicator color="#FFF8EF" />
              ) : (
                <Text style={styles.saveButtonText}>Salvar</Text>
              )}
            </TouchableOpacity>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}
