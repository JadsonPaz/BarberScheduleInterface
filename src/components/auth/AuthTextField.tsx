import React from 'react';
import { Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

type AuthTextFieldProps = TextInputProps & {
  label: string;
  icon?: React.ReactNode;
  onIconPress?: () => void;
};

export function AuthTextField({ label, icon, onIconPress, ...props }: AuthTextFieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.input, icon ? styles.inputWithIcon : undefined]}
          placeholderTextColor="#9B948C"
          selectionColor="#2F6B5F"
          {...props}
        />
        {icon && (
          <TouchableOpacity style={styles.iconButton} onPress={onIconPress} activeOpacity={0.7}>
            {icon}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
