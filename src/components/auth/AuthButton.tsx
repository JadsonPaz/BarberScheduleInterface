import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { styles } from './styles';

type AuthButtonProps = TouchableOpacityProps & {
  title: string;
  loading?: boolean;
};

export function AuthButton({ title, loading = false, disabled, ...props }: AuthButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[styles.button, isDisabled && styles.buttonDisabled]}
      disabled={isDisabled}
      {...props}
    >
      {loading ? <ActivityIndicator color="#FFF8EF" /> : <Text style={styles.buttonText}>{title}</Text>}
    </TouchableOpacity>
  );
}
