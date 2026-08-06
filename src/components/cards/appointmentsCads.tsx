import React from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';

import type { Appointment, AppointmentStatus } from '../../types/appointments';
import { formatAppointmentDate, getAppointmentClientName, getAppointmentServiceName } from '../../utils/appointments';
import { styles } from './styles';

type AppointmentCardProps = {
  appointment: Appointment;
  onPress?: (appointment: Appointment) => void;
  onCancel?: (appointment: Appointment) => void;
  onStatusChange?: (appointment: Appointment, status: AppointmentStatus) => void;
  cancelLoading?: boolean;
  statusLoading?: AppointmentStatus | null;
  readonly?: boolean;
  showClientName?: boolean;
};

export function AppointmentCard({
  appointment,
  onPress,
  onCancel,
  onStatusChange,
  cancelLoading = false,
  statusLoading = null,
  readonly = false,
  showClientName = false,
}: AppointmentCardProps) {
  const canPress = Boolean(onPress && !readonly);
  const showCancel = Boolean(onCancel && !readonly);
  const showStatusActions = Boolean(onStatusChange && !readonly);
  const isDoneLoading = statusLoading === 'done';
  const isCancelledLoading = statusLoading === 'cancelled';
  const clientName = showClientName ? getAppointmentClientName(appointment) : '';

  return (
    <Pressable
      style={[styles.card, !canPress && styles.cardReadOnly]}
      onPress={canPress ? () => onPress?.(appointment) : undefined}
      android_ripple={{ color: '#ECE5DD' }}
    >
      <View style={styles.info}>
        {showClientName && (
          <Text style={styles.clientName} numberOfLines={1}>
            {clientName}
          </Text>
        )}

        <Text style={styles.service} numberOfLines={1}>
          {getAppointmentServiceName(appointment)}
        </Text>
        <View style={styles.metaRow}>
          <Text style={styles.meta}>{formatAppointmentDate(appointment.date)}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.meta}>{appointment.time}</Text>
        </View>
      </View>

      {showStatusActions && (
        <View style={styles.statusActions}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={[
              styles.statusButton,
              styles.doneButton,
              appointment.status === 'done' && styles.statusButtonDisabled,
            ]}
            onPress={() => onStatusChange?.(appointment, 'done')}
            disabled={Boolean(statusLoading) || appointment.status === 'done'}
          >
            <Text style={[styles.statusIcon, styles.doneIcon]}>
              {isDoneLoading ? '...' : '✓'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            style={[
              styles.statusButton,
              styles.cancelledButton,
              appointment.status === 'cancelled' && styles.statusButtonDisabled,
            ]}
            onPress={() => onStatusChange?.(appointment, 'cancelled')}
            disabled={Boolean(statusLoading) || appointment.status === 'cancelled'}
          >
            <Text style={[styles.statusIcon, styles.cancelledIcon]}>
              {isCancelledLoading ? '...' : '×'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {showCancel && (
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.cancelButton}
          onPress={() => onCancel?.(appointment)}
          disabled={cancelLoading}
        >
          <Text style={styles.cancelIcon}>{cancelLoading ? '...' : '×'}</Text>
        </TouchableOpacity>
      )}
    </Pressable>
  );
}
