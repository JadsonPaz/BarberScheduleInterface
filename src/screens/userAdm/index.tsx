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
import type { AdminBottomTabParamList, RootStackParamList } from '../../types/navigation';
import { styles } from './styles';

type UserAdmScreenProps = BottomTabScreenProps<AdminBottomTabParamList, 'UserAdm'>;
type AdmProfileRouteName = 'ManageAvailability' | 'ManageServices' | 'PersonalDataAdm' | 'Clients';

type ProfileOption = {
  title: string;
  description: string;
  route: AdmProfileRouteName;
  icon: React.ComponentProps<typeof Ionicons>['name'];
};

const options: ProfileOption[] = [
  {
    title: 'Gerenciar disponibilidade',
    description: 'Configure dias e horários de atendimento.',
    route: 'ManageAvailability',
    icon: 'calendar-outline',
  },
  {
    title: 'Gerenciar serviços',
    description: 'Organize os serviços oferecidos.',
    route: 'ManageServices',
    icon: 'construct-outline',
  },
  {
    title: 'Dados pessoais',
    description: 'Atualize suas informações de perfil.',
    route: 'PersonalDataAdm',
    icon: 'person-outline',
  },
  {
    title: 'Clientes',
    description: 'Veja seus clientes.',
    route: 'Clients',
    icon: 'people-outline',
  },
];

function getInitials(user?: AuthUser) {
  const name = user?.fullname || user?.name || user?.email || 'A';
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

export default function UserAdmScreen({ navigation, route }: UserAdmScreenProps) {
  const [logoutPopupVisible, setLogoutPopupVisible] = useState(false);
  const { logout } = useAuthServices();
  const insets = useSafeAreaInsets();
  const barber = route.params?.user;
  const displayName = barber?.fullname || barber?.name || 'Barbeiro';
  const rootNavigation = navigation.getParent<NavigationProp<RootStackParamList>>();

  function handleNavigate(routeName: AdmProfileRouteName) {
    switch (routeName) {
      case 'ManageAvailability':
        rootNavigation?.navigate('ManageAvailability', route.params);
        break;
      case 'ManageServices':
        rootNavigation?.navigate('ManageServices', route.params);
        break;
      case 'PersonalDataAdm':
        rootNavigation?.navigate('PersonalDataAdm', route.params);
        break;
      case 'Clients':
        rootNavigation?.navigate('Clients', route.params);
        break;
    }
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
          <View style={styles.avatarDisplay}>
            {barber?.avatarUrl ? (
              <Image source={{ uri: barber.avatarUrl }} style={styles.avatarImage} />
            ) : (
              <Text style={styles.avatarInitials}>{getInitials(barber)}</Text>
            )}
          </View>

          <Text style={styles.name}>{displayName}</Text>
          {barber?.email && <Text style={styles.email}>{barber.email}</Text>}
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

