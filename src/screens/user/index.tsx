import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CommonActions } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LogoutPopup } from '../../components/popups/logoutPopup';
import useAuthServices from '../../services/authService';
import type { AuthUser } from '../../types/auth';
import type { BottomTabParamList, RootStackParamList } from '../../types/navigation';
import { styles } from './styles';

type UserScreenProps = BottomTabScreenProps<BottomTabParamList, 'User'>;
type ProfileRouteName = 'MyAppointments' | 'PersonalData' | 'History';

type ProfileOption = {
  title: string;
  description: string;
  route: ProfileRouteName;
  icon: React.ComponentProps<typeof Ionicons>['name'];
};

const options: ProfileOption[] = [
  {
    title: 'Meus agendamentos',
    description: 'Acompanhe seus próximos horários.',
    route: 'MyAppointments',
    icon: 'calendar-outline',
  },
  {
    title: 'Dados pessoais',
    description: 'Veja e atualize suas informações.',
    route: 'PersonalData',
    icon: 'person-outline',
  },
  {
    title: 'Histórico',
    description: 'Consulte agendamentos anteriores.',
    route: 'History',
    icon: 'time-outline',
  },
];

function getInitials(user?: AuthUser) {
  const name = user?.fullname || user?.name || user?.email || 'U';
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

export default function UserScreen({ navigation, route }: UserScreenProps) {
  const [logoutPopupVisible, setLogoutPopupVisible] = useState(false);
  const { logout } = useAuthServices();
  const insets = useSafeAreaInsets();
  const user = route.params?.user;
  const displayName = user?.fullname || user?.name || 'Usuário';
  const rootNavigation = navigation.getParent<NavigationProp<RootStackParamList>>();

  function handleNavigate(routeName: ProfileRouteName) {
    rootNavigation?.navigate(routeName, route.params);
  }

  async function handleLogout() {
    setLogoutPopupVisible(false);
    await logout();

    rootNavigation?.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 128 + insets.bottom }]}
        showsVerticalScrollIndicator={false}
      >
      <View style={styles.profileHeader}>
        <LinearGradient
          colors={['#2F6B5F', '#4E8B7A']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={[styles.profileTop, { marginHorizontal: -24, paddingTop: insets.top + 28 }]}
        >
          <View style={styles.avatarButton}>
            {user?.avatarUrl ? (
              <Image source={{ uri: user.avatarUrl }} style={styles.avatarImage} />
            ) : (
              <Text style={styles.avatarInitials}>{getInitials(user)}</Text>
            )}
          </View>

          <Text style={styles.name}>{displayName}</Text>
          {user?.email && <Text style={styles.email}>{user.email}</Text>}
        </LinearGradient>
      </View>

      <View style={styles.options}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.route}
            activeOpacity={0.85}
            style={styles.optionCard}
            onPress={() => handleNavigate(option.route)}
          >
            <View style={styles.optionIconWrapper}>
              <Ionicons name={option.icon} size={20} color="#2F6B5F" />
            </View>
            <View style={styles.optionTextGroup}>
              <Text style={styles.optionTitle}>{option.title}</Text>
              <Text style={styles.optionDescription}>{option.description}</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#2F6B5F" />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity activeOpacity={0.85} style={styles.logoutButton} onPress={() => setLogoutPopupVisible(true)}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>

      </ScrollView>

      <LogoutPopup
        visible={logoutPopupVisible}
        onCancel={() => setLogoutPopupVisible(false)}
        onConfirm={handleLogout}
      />
    </View>
  );
}

