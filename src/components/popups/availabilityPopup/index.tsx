import React from 'react';
import { ActivityIndicator, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';

export type AvailabilityDraft = {
  startTime: string;
  endTime: string;
  slotDuration: number;
};

type AvailabilityEditorPopupProps = {
  visible: boolean;
  dayLabel?: string;
  draft: AvailabilityDraft;
  timeOptions: string[];
  durationOptions: number[];
  isSaving: boolean;
  onClose: () => void;
  onSave: () => void;
  onChangeDraft: (draft: AvailabilityDraft) => void;
};

export default function AvailabilityEditorPopup({
  visible,
  dayLabel,
  draft,
  timeOptions,
  durationOptions,
  isSaving,
  onClose,
  onSave,
  onChangeDraft,
}: AvailabilityEditorPopupProps) {
  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.modalTitle}>{dayLabel}</Text>
            <Text style={styles.modalSubtitle}>Edite a janela de atendimento desse dia.</Text>

            <Text style={styles.fieldLabel}>Horário inicial:</Text>
            <View style={styles.selectedValue}>
              <Text style={styles.selectedValueText}>{draft.startTime} ▼</Text>
            </View>
            <View style={styles.optionGrid}>
              {timeOptions.map((time) => (
                <TouchableOpacity
                  key={`start-${time}`}
                  activeOpacity={0.82}
                  style={[styles.optionChip, draft.startTime === time && styles.optionChipActive]}
                  onPress={() => onChangeDraft({ ...draft, startTime: time })}
                >
                  <Text
                    style={[
                      styles.optionChipText,
                      draft.startTime === time && styles.optionChipTextActive,
                    ]}
                  >
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.fieldLabel}>Horário final:</Text>
            <View style={styles.selectedValue}>
              <Text style={styles.selectedValueText}>{draft.endTime} ▼</Text>
            </View>
            <View style={styles.optionGrid}>
              {timeOptions.map((time) => (
                <TouchableOpacity
                  key={`end-${time}`}
                  activeOpacity={0.82}
                  style={[styles.optionChip, draft.endTime === time && styles.optionChipActive]}
                  onPress={() => onChangeDraft({ ...draft, endTime: time })}
                >
                  <Text
                    style={[
                      styles.optionChipText,
                      draft.endTime === time && styles.optionChipTextActive,
                    ]}
                  >
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.fieldLabel}>Duração:</Text>
            <View style={styles.durationRow}>
              {durationOptions.map((duration) => (
                <TouchableOpacity
                  key={duration}
                  activeOpacity={0.82}
                  style={[
                    styles.durationChip,
                    draft.slotDuration === duration && styles.optionChipActive,
                  ]}
                  onPress={() => onChangeDraft({ ...draft, slotDuration: duration })}
                >
                  <Text
                    style={[
                      styles.optionChipText,
                      draft.slotDuration === duration && styles.optionChipTextActive,
                    ]}
                  >
                    {duration} min
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                activeOpacity={0.82}
                style={styles.cancelButton}
                onPress={onClose}
                disabled={isSaving}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.82}
                style={styles.saveButton}
                onPress={onSave}
                disabled={isSaving}
              >
                {isSaving ? (
                  <ActivityIndicator color="#FFF8EF" />
                ) : (
                  <Text style={styles.saveButtonText}>Salvar</Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
//availabilityPopup