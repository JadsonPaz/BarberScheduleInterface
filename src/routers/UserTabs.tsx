import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HomeScreen from '../screens/home';
import UserScreen from '../screens/user';
import type { BottomTabParamList, RootStackParamList } from '../types/navigation';

type UserTabsProps = NativeStackScreenProps<RootStackParamList, 'UserTabs'>;

const Tab = createBottomTabNavigator<BottomTabParamList>();
const TAB_BAR_BASE_HEIGHT = 72;

type TabIconName = React.ComponentProps<typeof Ionicons>['name'];

function TabButtonIcon({
  focused,
  icon,
}: {
  focused: boolean;
  icon: TabIconName;
}) {
  return (
    <View style={[tabStyles.item, focused && tabStyles.itemActive]}>
      <Ionicons name={icon} size={22} color={focused ? '#FFFDF9' : '#201B17'} />
    </View>
  );
}

export function UserTabs({ route }: UserTabsProps) {
  const auth = route.params;
  const insets = useSafeAreaInsets();
  const tabBarHeight = TAB_BAR_BASE_HEIGHT + insets.bottom;

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        animation: 'shift',
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: tabBarHeight,

          backgroundColor: '#FFFDF9',
          borderTopWidth: 1,
          borderTopColor: '#ECE5DD',

          paddingHorizontal: 34,
          paddingTop: 10,
          paddingBottom: Math.max(insets.bottom, 10),

          elevation: 10,
          shadowColor: '#201B17',
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: -4 },
        },
        tabBarItemStyle: {
          height: 48,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        initialParams={auth}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabButtonIcon focused={focused} icon={focused ? 'home' : 'home-outline'} />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={UserScreen}
        initialParams={auth}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabButtonIcon focused={focused} icon={focused ? 'person' : 'person-outline'} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const tabStyles = {
  item: {
    minWidth: 56,
    height: 46,
    borderRadius: 23,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    flexDirection: 'row' as const,
    gap: 8,
    paddingHorizontal: 14,
  },
  itemActive: {
    minWidth: 72,
    backgroundColor: '#201B17',
  },
};
