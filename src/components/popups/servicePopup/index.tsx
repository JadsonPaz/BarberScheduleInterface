import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';

import type { Service } from '../../../types/scheduling';
import { styles } from './styles';

export type ServiceDraft = {
  name: string;
  price: string;
  duration: string;
  description: string;
};

type ServicePopupProps = {
  visible: boolean;
  service?: Service | null;
  isSaving: boolean;
  isDeleting: boolean;
  onClose: () => void;
  onSave: (draft: ServiceDraft) => void;
  onDelete: () => void;
};

function getInitialDraft(service?: Service | null): ServiceDraft {
  return {
    name: service?.name ?? '',
    price: service?.price !== undefined ? String(service.price) : '',
    duration: service?.duration !== undefined ? String(service.duration) : '',
    description: service?.description ?? '',
  };
}

export default function ServicePopup({
  visible,
  service,
  isSaving,
  isDeleting,
  onClose,
  onSave,
  onDelete,
}: ServicePopupProps) {
  const [draft, setDraft] = useState<ServiceDraft>(() => getInitialDraft(service));

  useEffect(() => {
    setDraft(getInitialDraft(service));
  }, [service]);

  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Editar servico</Text>
          <Text style={styles.subtitle}>Atualize as informacoes ou remova este servico.</Text>

          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            value={draft.name}
            onChangeText={(name) => setDraft((current) => ({ ...current, name }))}
            placeholder="Nome do servico"
            placeholderTextColor="#9B948C"
          />

          <Text style={styles.label}>Preco</Text>
          <TextInput
            style={styles.input}
            value={draft.price}
            onChangeText={(price) => setDraft((current) => ({ ...current, price }))}
            placeholder="50"
            placeholderTextColor="#9B948C"
            keyboardType="decimal-pad"
          />

          <Text style={styles.label}>Duracao em minutos</Text>
          <TextInput
            style={styles.input}
            value={draft.duration}
            onChangeText={(duration) => setDraft((current) => ({ ...current, duration }))}
            placeholder="60"
            placeholderTextColor="#9B948C"
            keyboardType="number-pad"
          />

          <Text style={styles.label}>Descricao</Text>
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            value={draft.description}
            onChangeText={(description) => setDraft((current) => ({ ...current, description }))}
            placeholder="Opcional"
            placeholderTextColor="#9B948C"
            multiline
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
                <Text style={styles.deleteButtonText}>Excluir</Text>
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
                <Text style={styles.saveButtonText}>Salvar</Text>
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity activeOpacity={0.82} style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
