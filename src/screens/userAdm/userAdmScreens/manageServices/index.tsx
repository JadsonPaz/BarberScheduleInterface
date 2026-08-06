import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ServiceCard from '../../../../components/cards/serviceCard';
import { ScreenHeader } from '../../../../components/headers/ScreenHeader';
import ServicePopup, { type ServiceDraft } from '../../../../components/popups/servicePopup';
import {
  deleteService,
  getServicesByBarber,
  updateService,
} from '../../../../services/schedulingService';
import type { Service } from '../../../../types/scheduling';
import type { RootStackParamList } from '../../../../types/navigation';
import { styles } from './styles';

type ManageServicesProps = NativeStackScreenProps<RootStackParamList, 'ManageServices'>;

function parsePrice(value: string) {
  return Number(value.replace(',', '.'));
}

export default function ManageServices({ navigation, route }: ManageServicesProps) {
  const insets = useSafeAreaInsets();
  const barberId = route.params?.user.id || route.params?.user._id;
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');

  const loadServices = useCallback(async () => {
    if (!barberId) {
      setError('Não foi possível identificar o barbeiro logado.');
      setIsLoading(false);
      return;
    }

    try {
      setError('');
      const data = await getServicesByBarber(barberId);
      setServices(data);
    } catch {
      setError('Não foi possível carregar os serviços.');
    } finally {
      setIsLoading(false);
    }
  }, [barberId]);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  useFocusEffect(
    useCallback(() => {
      loadServices();
    }, [loadServices])
  );

  async function handleSave(draft: ServiceDraft) {
    if (!selectedService) return;

    const price = parsePrice(draft.price);
    const duration = Number(draft.duration);

    if (!draft.name.trim()) {
      Alert.alert('Serviço', 'Informe o nome do serviço.');
      return;
    }

    if (!Number.isFinite(price) || price < 0) {
      Alert.alert('Serviço', 'Informe um preço válido.');
      return;
    }

    if (!Number.isInteger(duration) || duration <= 0) {
      Alert.alert('Serviço', 'Informe a duração em minutos.');
      return;
    }

    setIsSaving(true);

    try {
      await updateService(selectedService._id, {
        name: draft.name.trim(),
        price,
        duration,
        description: draft.description.trim(),
      });
      await loadServices();
      setSelectedService(null);
    } catch {
      Alert.alert('Serviço', 'Não foi possível salvar o serviço.');
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    if (!selectedService) return;

    setIsDeleting(true);

    try {
      await deleteService(selectedService._id);
      await loadServices();
      setSelectedService(null);
    } catch {
      Alert.alert('Serviço', 'Não foi possível excluir o serviço.');
    } finally {
      setIsDeleting(false);
    }
  }

  function handleBackToProfile() {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'AdminTabs',
            params: {
              screen: 'UserAdm',
              params: route.params,
            },
          },
        ],
      })
    );
  }

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Gerenciar serviços"
        subtitle="Edite, remova ou adicione serviços oferecidos por você."
        onBack={handleBackToProfile}
      />

      {isLoading ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator color="#2F6B5F" />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={[styles.listContent, { paddingBottom: 132 + insets.bottom }]}
          showsVerticalScrollIndicator={false}
        >
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {services.length ? (
            services.map((service) => (
              <ServiceCard
                key={service._id}
                service={service}
                onPress={() => setSelectedService(service)}
              />
            ))
          ) : (
            <Text style={styles.emptyText}>Nenhum serviço cadastrado ainda.</Text>
          )}
        </ScrollView>
      )}

      <TouchableOpacity
        activeOpacity={0.86}
        style={[styles.floatingButton, { bottom: 26 + insets.bottom }]}
        onPress={() => navigation.navigate('AddService', route.params)}
      >
        <Text style={styles.floatingButtonText}>Adicionar serviço</Text>
      </TouchableOpacity>

      <ServicePopup
        visible={Boolean(selectedService)}
        service={selectedService}
        isSaving={isSaving}
        isDeleting={isDeleting}
        onClose={() => setSelectedService(null)}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </View>
  );
}
