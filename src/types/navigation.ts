import type { LoginResult } from './auth';

export type RootStackParamList = {
  Login: { token?: string; sessionMessage?: string } | undefined;
  UserTabs: LoginResult | undefined;
  AdminTabs: LoginResult | undefined;
  Scheduling: LoginResult | undefined;
  MyAppointments: LoginResult | undefined;
  PersonalData: LoginResult | undefined;
  History: LoginResult | undefined;
  ManageAvailability: LoginResult | undefined;
  AvailabilityDays: LoginResult | undefined;
  BlockedSlots: LoginResult | undefined;
  NewBlockedSlot: LoginResult | undefined;
  ManageServices: LoginResult | undefined;
  AddService: LoginResult | undefined;
  PersonalDataAdm: LoginResult | undefined;
  Clients: LoginResult | undefined;
  Dashboard: LoginResult | undefined;
};

export type BottomTabParamList = {
  Home: LoginResult | undefined;
  User: LoginResult | undefined;
};

export type AdminBottomTabParamList = {
  Admin: LoginResult | undefined;
  UserAdm: LoginResult | undefined;
};
