import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';

type ProfileInfoPopupProps = {
  visible: boolean;
  initialName: string;
  initialEmail: string;
  isLoading: boolean;
  onClose: () => void;
  onSave: (data: { fullname: string; email: string }) => void;
};

export default function ProfileInfoPopup({
  visible,
  initialName,
  initialEmail,
  isLoading,
  onClose,
  onSave,
}: ProfileInfoPopupProps) {
  const [fullname, setFullname] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);

  useEffect(() => {
    if (visible) {
      setFullname(initialName);
      setEmail(initialEmail);
    }
  }, [initialEmail, initialName, visible]);

  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Nome e e-mail</Text>
          <Text style={styles.subtitle}>Atualize suas informacoes principais de perfil.</Text>

          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            value={fullname}
            onChangeText={setFullname}
            placeholder="Seu nome"
            placeholderTextColor="#9B948C"
          />

          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="voce@email.com"
            placeholderTextColor="#9B948C"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
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
              onPress={() => onSave({ fullname, email })}
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
