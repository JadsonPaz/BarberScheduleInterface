import AsyncStorage from '@react-native-async-storage/async-storage';

import api from './api';
import type { AuthUser } from '../types/auth';

type ApiUserResponse = {
  success: boolean;
  body?: AuthUser;
};

export async function updateUserAvatar(userId: string, imageUri: string) {
  const filename = imageUri.split('/').pop() || 'avatar.jpg';
  const extension = filename.split('.').pop()?.toLowerCase();
  const mimeType = extension === 'png' ? 'image/png' : 'image/jpeg';
  const formData = new FormData();

  formData.append('avatar', {
    uri: imageUri,
    name: filename,
    type: mimeType,
  } as unknown as Blob);

  const response = await api.patch<ApiUserResponse>(`/users/${userId}/avatar`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data.body;
}

export async function updateUserProfile(userId: string, data: { fullname?: string; email?: string }) {
  const response = await api.patch<ApiUserResponse>(`/users/${userId}/profile`, data);
  return response.data.body;
}

export async function updateUserPassword(
  userId: string,
  data: { currentPassword: string; newPassword: string }
) {
  const response = await api.patch<{ success: boolean; body?: { text?: string } }>(
    `/users/${userId}/password`,
    data
  );
  return response.data.body;
}

export async function updateStoredAuthUser(user: AuthUser) {
  const storedAuth = await AsyncStorage.getItem('auth');

  if (!storedAuth) return;

  const parsedAuth = JSON.parse(storedAuth);
  await AsyncStorage.setItem('auth', JSON.stringify({ ...parsedAuth, user }));
}
