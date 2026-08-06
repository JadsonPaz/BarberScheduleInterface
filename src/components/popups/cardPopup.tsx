import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';

import type { Appointment } from '../../types/appointments';
import {
  formatAppointmentDate,
  formatAppointmentPrice,
  formatAppointmentStatus,
  getAppointmentBarberName,
  getAppointmentServiceName,
} from '../../utils/appointments';
import { styles } from './styles';

type AppointmentPopupProps = {
  appointment: Appointment | null;
  visible: boolean;
  onClose: () => void;
};

export function AppointmentPopup({ appointment, visible, onClose }: AppointmentPopupProps) {
  if (!appointment) return null;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <Text style={styles.title}>Detalhes do agendamento</Text>

          <View style={styles.detailGroup}>
            <Text style={styles.label}>Serviço</Text>
            <Text style={styles.value}>{getAppointmentServiceName(appointment)}</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.rowItem}>
              <Text style={styles.label}>Data</Text>
              <Text style={styles.value}>{formatAppointmentDate(appointment.date)}</Text>
            </View>
            <View style={styles.rowItem}>
              <Text style={styles.label}>Horário</Text>
              <Text style={styles.value}>{appointment.time}</Text>
            </View>
          </View>

          <View style={styles.detailGroup}>
            <Text style={styles.label}>Barbeiro</Text>
            <Text style={styles.value}>{getAppointmentBarberName(appointment)}</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.rowItem}>
              <Text style={styles.label}>Status</Text>
              <Text style={styles.value}>{formatAppointmentStatus(appointment.status)}</Text>
            </View>
            <View style={styles.rowItem}>
              <Text style={styles.label}>Preço</Text>
              <Text style={styles.value}>{formatAppointmentPrice(appointment)}</Text>
            </View>
          </View>

          {appointment.notes && (
            <View style={styles.detailGroup}>
              <Text style={styles.label}>Observações</Text>
              <Text style={styles.value}>{appointment.notes}</Text>
            </View>
          )}

          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Fechar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
