import React, { useEffect } from 'react';
import { CommonActions, createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import DashboardScreen from '../screens/admin/dashboard';
import LoginScreen from '../screens/login';
import SchedulingScreen from '../screens/scheduling';
import HistoryScreen from '../screens/user/userScreens/history';
import MyAppointmentsScreen from '../screens/user/userScreens/myAppointments';
import PersonalDataScreen from '../screens/user/userScreens/personalData';
import AvailabilityScreen from '../screens/userAdm/userAdmScreens/availability';
import AvailabilityDaysScreen from '../screens/userAdm/userAdmScreens/availability/availabilityDays';
import BlockedSlotsScreen from '../screens/userAdm/userAdmScreens/availability/blockedSlots';
import NewBlockedSlotScreen from '../screens/userAdm/userAdmScreens/availability/blockedSlots/NewBlockedSlot';
import ClientScreen from '../screens/userAdm/userAdmScreens/client';
import AddServiceScreen from '../screens/userAdm/userAdmScreens/manageServices/addService';
import ManageServicesScreen from '../screens/userAdm/userAdmScreens/manageServices';
import PersonalDataAdmScreen from '../screens/userAdm/userAdmScreens/personalDataAdm';
import { onSessionExpired } from '../services/sessionEvents';
import type { RootStackParamList } from '../types/navigation';
import { AdminTabs } from './AdminTabs';
import { UserTabs } from './UserTabs';

const Stack = createNativeStackNavigator<RootStackParamList>();
const navigationRef = createNavigationContainerRef<RootStackParamList>();

const linking = {
  prefixes: ['chicocabelo://', 'barbeariaapp://'],

  config: {
    screens: {
      Login: 'reset-password',
    },
  },
};

export function AppRoutes() {
  useEffect(() => {
    return onSessionExpired((message) => {
      if (!navigationRef.isReady()) return;

      navigationRef.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login', params: { sessionMessage: message } }],
        })
      );
    });
  }, []);

  return (
    <NavigationContainer ref={navigationRef} linking={linking}>
      <StatusBar style="dark" />

      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#F7F2EA' },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="UserTabs" component={UserTabs} />
        <Stack.Screen name="AdminTabs" component={AdminTabs} />
        <Stack.Screen name="Scheduling" component={SchedulingScreen} />
        <Stack.Screen name="MyAppointments" component={MyAppointmentsScreen} />
        <Stack.Screen name="PersonalData" component={PersonalDataScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="ManageAvailability" component={AvailabilityScreen} />
        <Stack.Screen name="AvailabilityDays" component={AvailabilityDaysScreen} />
        <Stack.Screen name="BlockedSlots" component={BlockedSlotsScreen} />
        <Stack.Screen name="NewBlockedSlot" component={NewBlockedSlotScreen} />
        <Stack.Screen name="ManageServices" component={ManageServicesScreen} />
        <Stack.Screen name="AddService" component={AddServiceScreen} />
        <Stack.Screen name="PersonalDataAdm" component={PersonalDataAdmScreen} />
        <Stack.Screen name="Clients" component={ClientScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

