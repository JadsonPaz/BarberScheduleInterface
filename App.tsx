import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppRoutes } from './src/routers/AppRoutes';

export default function App() {
  return (
    <SafeAreaProvider>
      <AppRoutes />
    </SafeAreaProvider>
  );
}
