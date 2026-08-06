import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';

import { styles } from './styles';

type LogoutPopupProps = {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void | Promise<void>;
};

export function LogoutPopup({ visible, onCancel, onConfirm }: LogoutPopupProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <Text style={styles.title}>Sair da conta</Text>
          <Text style={styles.message}>Você realmente deseja sair da conta?</Text>

          <View style={styles.actions}>
            <Pressable style={[styles.button, styles.cancelButton]} onPress={onCancel}>
              <Text style={[styles.buttonText, styles.cancelText]}>Voltar</Text>
            </Pressable>

            <Pressable style={[styles.button, styles.confirmButton]} onPress={onConfirm}>
              <Text style={[styles.buttonText, styles.confirmText]}>Sim</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
