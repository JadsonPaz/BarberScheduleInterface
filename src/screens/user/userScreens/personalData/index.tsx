import React, { useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';

import ProfileInfoCard from '../../../../components/cards/profileInfoCard';
import { ScreenHeader } from '../../../../components/headers/ScreenHeader';
import ProfilePasswordCard from '../../../../components/cards/profilePasswordCard';
import ProfileInfoPopup from '../../../../components/popups/profileInfoPopup';
import ProfilePasswordPopup from '../../../../components/popups/profilePasswordPopup';
import {
  updateStoredAuthUser,
  updateUserAvatar,
  updateUserPassword,
  updateUserProfile,
} from '../../../../services/userService';
import type { AuthUser } from '../../../../types/auth';
import type { RootStackParamList } from '../../../../types/navigation';
import { isValidEmail, normalizeEmail } from '../../../../utils/validators';
import { styles } from './styles';

type PersonalDataScreenProps = NativeStackScreenProps<RootStackParamList, 'PersonalData'>;

function getRequestErrorMessage(error: unknown) {
  const response = (error as any)?.response?.data;
  return (
    response?.body?.text ??
    response?.body?.message ??
    response?.message ??
    'Não foi possível concluir a solicitação.'
  );
}

function getInitials(user?: AuthUser) {
  const name = user?.fullname || user?.name || user?.email || 'U';
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

export default function PersonalDataScreen({ navigation, route }: PersonalDataScreenProps) {
  const initialUser = route.params?.user;
  const [user, setUser] = useState(initialUser);
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [profilePopupVisible, setProfilePopupVisible] = useState(false);
  const [passwordPopupVisible, setPasswordPopupVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const userId = user?._id || user?.id;
  const displayName = user?.fullname || user?.name || '';

  function syncUser(nextUser: AuthUser) {
    setUser(nextUser);
    updateStoredAuthUser(nextUser);
    navigation.dispatch(
      CommonActions.setParams({
        ...route.params,
        user: nextUser,
      })
    );
  }

  async function handleSaveProfile(data: { fullname: string; email: string }) {
    if (!userId) return;

    if (!data.fullname.trim()) {
      setError('Informe seu nome.');
      return;
    }

    if (!isValidEmail(data.email)) {
      setError('Informe um e-mail valido.');
      return;
    }

    try {
      setError('');
      setMessage('');
      setProfileLoading(true);
      const nextUser = await updateUserProfile(userId, {
        fullname: data.fullname.trim(),
        email: normalizeEmail(data.email),
      });

      if (nextUser) {
        syncUser(nextUser);
        setProfilePopupVisible(false);
        setMessage('Dados atualizados com sucesso.');
      }
    } catch (requestError) {
      setError(getRequestErrorMessage(requestError));
    } finally {
      setProfileLoading(false);
    }
  }

  async function handleSavePassword(data: {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }) {
    if (!userId) return;

    if (!data.currentPassword || !data.newPassword) {
      setError('Informe a senha atual e a nova senha.');
      return;
    }

    if (data.newPassword.length < 6) {
      setError('A nova senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (data.newPassword !== data.confirmNewPassword) {
      setError('As senhas nao conferem.');
      return;
    }

    try {
      setError('');
      setMessage('');
      setPasswordLoading(true);
      const response = await updateUserPassword(userId, {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      setPasswordPopupVisible(false);
      setMessage(response?.text || 'Senha atualizada com sucesso.');
    } catch (requestError) {
      setError(getRequestErrorMessage(requestError));
    } finally {
      setPasswordLoading(false);
    }
  }

  async function handlePickAvatar() {
    if (!userId) return;

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      setError('Permita o acesso a galeria para alterar a foto.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.85,
      mediaTypes: ['images'],
    });

    if (result.canceled) return;

    try {
      setError('');
      setMessage('');
      setAvatarLoading(true);
      const nextUser = await updateUserAvatar(userId, result.assets[0].uri);

      if (nextUser) {
        syncUser(nextUser);
        setMessage('Foto atualizada com sucesso.');
      }
    } catch (requestError) {
      setError(getRequestErrorMessage(requestError));
    } finally {
      setAvatarLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <ScreenHeader
          title="Dados pessoais"
          subtitle="Atualize suas informações de perfil."
          onBack={navigation.goBack}
        />

        {error ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        {message ? (
          <View style={styles.successBox}>
            <Text style={styles.successText}>{message}</Text>
          </View>
        ) : null}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Foto de perfil</Text>
          <View style={styles.avatarRow}>
            <View style={styles.avatar}>
              {user?.avatarUrl ? (
                <Image source={{ uri: user.avatarUrl }} style={styles.avatarImage} />
              ) : (
                <Text style={styles.avatarInitials}>{getInitials(user)}</Text>
              )}
              {avatarLoading && (
                <View style={styles.avatarOverlay}>
                  <ActivityIndicator color="#FFF8EF" />
                </View>
              )}
            </View>
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.secondaryButton}
              onPress={handlePickAvatar}
              disabled={avatarLoading}
            >
              <Text style={styles.secondaryButtonText}>Alterar foto</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.cards}>
          <ProfileInfoCard
            name={displayName}
            email={user?.email}
            onPress={() => setProfilePopupVisible(true)}
          />
          <ProfilePasswordCard onPress={() => setPasswordPopupVisible(true)} />
        </View>
      </ScrollView>

      <ProfileInfoPopup
        visible={profilePopupVisible}
        initialName={displayName}
        initialEmail={user?.email || ''}
        isLoading={profileLoading}
        onClose={() => setProfilePopupVisible(false)}
        onSave={handleSaveProfile}
      />

      <ProfilePasswordPopup
        visible={passwordPopupVisible}
        isLoading={passwordLoading}
        onClose={() => setPasswordPopupVisible(false)}
        onSave={handleSavePassword}
      />
    </View>
  );
}
