import React, { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import ServiceFormCard from '../../../../../components/cards/serviceFormCard';
import { ScreenHeader } from '../../../../../components/headers/ScreenHeader';
import { createService } from '../../../../../services/schedulingService';
import type { RootStackParamList } from '../../../../../types/navigation';
import { styles } from './styles';

type AddServiceProps = NativeStackScreenProps<RootStackParamList, 'AddService'>;

function parsePrice(value: string) {
  return Number(value.replace(',', '.'));
}

export default function AddService({ navigation, route }: AddServiceProps) {
  const barberId = route.params?.user.id || route.params?.user._id;
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  async function handleSave() {
    if (!barberId) return;

    const parsedPrice = parsePrice(price);
    const parsedDuration = Number(duration);

    if (!name.trim()) {
      Alert.alert('Serviço', 'Informe o nome do serviço.');
      return;
    }

    if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
      Alert.alert('Serviço', 'Informe um preço válido.');
      return;
    }

    if (!Number.isInteger(parsedDuration) || parsedDuration <= 0) {
      Alert.alert('Serviço', 'Informe a duração em minutos.');
      return;
    }

    setIsSaving(true);

    try {
      await createService({
        barberId,
        name: name.trim(),
        price: parsedPrice,
        duration: parsedDuration,
        description: description.trim(),
        active: true,
      });

      Alert.alert('Serviço criado', 'O serviço foi cadastrado com sucesso.');
      navigation.navigate('ManageServices', route.params);
    } catch {
      Alert.alert('Serviço', 'Não foi possível cadastrar o serviço.');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Adicionar serviço"
        subtitle="Cadastre um novo serviço para seus clientes agendarem."
        onBack={navigation.goBack}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ServiceFormCard title="Dados do serviço">
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Corte masculino"
            placeholderTextColor="#9B948C"
          />

          <Text style={styles.label}>Preço</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            placeholder="50"
            placeholderTextColor="#9B948C"
            keyboardType="decimal-pad"
          />

          <Text style={styles.label}>Duração em minutos</Text>
          <TextInput
            style={styles.input}
            value={duration}
            onChangeText={setDuration}
            placeholder="60"
            placeholderTextColor="#9B948C"
            keyboardType="number-pad"
          />

          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            value={description}
            onChangeText={setDescription}
            placeholder="Opcional"
            placeholderTextColor="#9B948C"
            multiline
          />
        </ServiceFormCard>

        <View style={styles.actions}>
          <TouchableOpacity
            activeOpacity={0.82}
            style={styles.backButton}
            onPress={() => navigation.navigate('ManageServices', route.params)}
            disabled={isSaving}
          >
            <Text style={styles.backButtonText}>Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.82}
            style={styles.saveButton}
            onPress={handleSave}
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
  );
}
