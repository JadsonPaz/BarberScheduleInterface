import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';

type ProfilePasswordPopupProps = {
  visible: boolean;
  isLoading: boolean;
  onClose: () => void;
  onSave: (data: {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }) => void;
};

export default function ProfilePasswordPopup({
  visible,
  isLoading,
  onClose,
  onSave,
}: ProfilePasswordPopupProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  useEffect(() => {
    if (!visible) {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    }
  }, [visible]);

  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Alterar senha</Text>
          <Text style={styles.subtitle}>Informe a senha atual e escolha uma nova senha.</Text>

          <Text style={styles.label}>Senha atual</Text>
          <TextInput
            style={styles.input}
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholder="Senha atual"
            placeholderTextColor="#9B948C"
            secureTextEntry
          />

          <Text style={styles.label}>Nova senha</Text>
          <TextInput
            style={styles.input}
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="Nova senha"
            placeholderTextColor="#9B948C"
            secureTextEntry
          />

          <Text style={styles.label}>Confirmar nova senha</Text>
          <TextInput
            style={styles.input}
            value={confirmNewPassword}
            onChangeText={setConfirmNewPassword}
            placeholder="Repita a nova senha"
            placeholderTextColor="#9B948C"
            secureTextEntry
          />

          <View style={styles.actions}>
            <TouchableOpacity
              activeOpacity={0.82}
              style={styles.cancelButton}
              onPress={onClose}
              disabled={isLoading}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.82}
              style={styles.saveButton}
              onPress={() =>
                onSave({
                  currentPassword,
                  newPassword,
                  confirmNewPassword,
                })
              }
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFF8EF" />
              ) : (
                <Text style={styles.saveButtonText}>Salvar</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
