import React from 'react';
import { ActivityIndicator, Modal, Text, TouchableOpacity, View } from 'react-native';

import type { Barber, Service } from '../../../types/scheduling';
import { formatFriendlyDate, getEntityName } from '../../../utils/scheduling';
import { styles } from './styles';

type ConfirmSchedulingPopupProps = {
  visible: boolean;
  barber: Barber | null;
  date: string;
  time: string;
  service: Service | null;
  loading: boolean;
  success: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

function formatPrice(price?: number) {
  if (typeof price !== 'number') return 'Não informado';

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
}

export function ConfirmSchedulingPopup({
  visible,
  barber,
  date,
  time,
  service,
  loading,
  success,
  onCancel,
  onConfirm,
}: ConfirmSchedulingPopupProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <View style={styles.popup}>
          {success ? (
            <View style={styles.successBox}>
              <Text style={styles.successText}>Agendamento confirmado com sucesso!</Text>
            </View>
          ) : (
            <>
              <Text style={styles.title}>Confirmar agendamento</Text>

              <View style={styles.row}>
                <Text style={styles.label}>Barbeiro</Text>
                <Text style={styles.value}>{getEntityName(barber ?? undefined)}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Dia e hora</Text>
                <Text style={styles.value}>{formatFriendlyDate(date)} às {time}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Serviço</Text>
                <Text style={styles.value}>{service?.name}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Valor</Text>
                <Text style={styles.value}>{formatPrice(service?.price)}</Text>
              </View>

              <View style={styles.actions}>
                <TouchableOpacity
                  activeOpacity={0.85}
                  style={styles.secondaryButton}
                  disabled={loading}
                  onPress={onCancel}
                >
                  <Text style={styles.secondaryText}>Voltar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.85}
                  style={styles.primaryButton}
                  disabled={loading}
                  onPress={onConfirm}
                >
                  {loading ? (
                    <ActivityIndicator color="#FFF8EF" />
                  ) : (
                    <Text style={styles.primaryText}>Confirmar</Text>
                  )}
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}
