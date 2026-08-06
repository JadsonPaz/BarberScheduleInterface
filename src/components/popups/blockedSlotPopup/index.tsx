import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import type { BlockedSlot } from '../../../types/scheduling';
import { styles } from './styles';

export type BlockedSlotEditDraft = {
  date: string;
  weekday: number;
  isFullDay: boolean;
  startTime: string;
  endTime: string;
  reason: string;
};

type BlockedSlotPopupProps = {
  visible: boolean;
  blockedSlot?: BlockedSlot | null;
  timeOptions: string[];
  isSaving: boolean;
  isDeleting: boolean;
  onClose: () => void;
  onSave: (draft: BlockedSlotEditDraft) => void;
  onDelete: () => void;
};

const weekdayOptions = [
  { label: 'Domingo', value: 0 },
  { label: 'Segunda', value: 1 },
  { label: 'Terça', value: 2 },
  { label: 'Quarta', value: 3 },
  { label: 'Quinta', value: 4 },
  { label: 'Sexta', value: 5 },
  { label: 'Sábado', value: 6 },
];

function normalizeDate(date?: string | null) {
  if (!date) return '';
  return date.includes('T') ? date.split('T')[0] : date;
}

function getInitialDraft(blockedSlot?: BlockedSlot | null): BlockedSlotEditDraft {
  return {
    date: normalizeDate(blockedSlot?.date),
    weekday: blockedSlot?.weekday ?? 1,
    isFullDay: Boolean(blockedSlot?.isFullDay),
    startTime: blockedSlot?.startTime ?? '08:00',
    endTime: blockedSlot?.endTime ?? '18:00',
    reason: blockedSlot?.reason ?? '',
  };
}

export default function BlockedSlotPopup({
  visible,
  blockedSlot,
  timeOptions,
  isSaving,
  isDeleting,
  onClose,
  onSave,
  onDelete,
}: BlockedSlotPopupProps) {
  const [draft, setDraft] = useState<BlockedSlotEditDraft>(() => getInitialDraft(blockedSlot));
  const isRecurring = blockedSlot?.weekday !== undefined && blockedSlot.weekday !== null;

  useEffect(() => {
    setDraft(getInitialDraft(blockedSlot));
  }, [blockedSlot]);

  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>Editar bloqueio</Text>
            <Text style={styles.subtitle}>
              Ajuste as informações ou remova este bloqueio da agenda.
            </Text>

            {isRecurring ? (
              <>
                <Text style={styles.label}>Dia da semana</Text>
                <View style={styles.weekdayGrid}>
                  {weekdayOptions.map((weekday) => (
                    <TouchableOpacity
                      key={weekday.value}
                      activeOpacity={0.82}
                      style={[
                        styles.chip,
                        draft.weekday === weekday.value && styles.chipActive,
                      ]}
                      onPress={() => setDraft((current) => ({ ...current, weekday: weekday.value }))}
                    >
                      <Text
                        style={[
                          styles.chipText,
                          draft.weekday === weekday.value && styles.chipTextActive,
                        ]}
                      >
                        {weekday.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            ) : (
              <>
                <Text style={styles.label}>Data</Text>
                <TextInput
                  value={draft.date}
                  onChangeText={(date) => setDraft((current) => ({ ...current, date }))}
                  placeholder="2025-08-20"
                  style={styles.input}
                />

                <TouchableOpacity
                  activeOpacity={0.82}
                  style={styles.checkboxRow}
                  onPress={() =>
                    setDraft((current) => ({ ...current, isFullDay: !current.isFullDay }))
                  }
                >
                  <View style={[styles.checkbox, draft.isFullDay && styles.checkboxActive]}>
                    <Text style={styles.checkboxMark}>{draft.isFullDay ? '✓' : ''}</Text>
                  </View>
                  <Text style={styles.checkboxText}>Dia inteiro</Text>
                </TouchableOpacity>
              </>
            )}

            {!draft.isFullDay || isRecurring ? (
              <>
                <Text style={styles.label}>Horário inicio</Text>
                <View style={styles.optionGrid}>
                  {timeOptions.map((time) => (
                    <TouchableOpacity
                      key={`start-${time}`}
                      activeOpacity={0.82}
                      style={[styles.timeChip, draft.startTime === time && styles.chipActive]}
                      onPress={() => setDraft((current) => ({ ...current, startTime: time }))}
                    >
                      <Text
                        style={[
                          styles.chipText,
                          draft.startTime === time && styles.chipTextActive,
                        ]}
                      >
                        {time}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <Text style={styles.label}>Horário fim</Text>
                <View style={styles.optionGrid}>
                  {timeOptions.map((time) => (
                    <TouchableOpacity
                      key={`end-${time}`}
                      activeOpacity={0.82}
                      style={[styles.timeChip, draft.endTime === time && styles.chipActive]}
                      onPress={() => setDraft((current) => ({ ...current, endTime: time }))}
                    >
                      <Text
                        style={[styles.chipText, draft.endTime === time && styles.chipTextActive]}
                      >
                        {time}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            ) : null}

            <Text style={styles.label}>Motivo</Text>
            <TextInput
              value={draft.reason}
              onChangeText={(reason) => setDraft((current) => ({ ...current, reason }))}
              placeholder="Opcional"
              style={styles.input}
            />

            <View style={styles.actions}>
              <TouchableOpacity
                activeOpacity={0.82}
                style={styles.deleteButton}
                onPress={onDelete}
                disabled={isSaving || isDeleting}
              >
                {isDeleting ? (
                  <ActivityIndicator color="#9E321F" />
                ) : (
                  <Text style={styles.deleteText}>Excluir</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.82}
                style={styles.saveButton}
                onPress={() => onSave(draft)}
                disabled={isSaving || isDeleting}
              >
                {isSaving ? (
                  <ActivityIndicator color="#FFF8EF" />
                ) : (
                  <Text style={styles.saveText}>Salvar</Text>
                )}
              </TouchableOpacity>
            </View>

            <TouchableOpacity activeOpacity={0.82} style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeText}>Cancelar</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
