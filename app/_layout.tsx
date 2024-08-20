
import React from 'react';
import { StyleSheet } from 'react-native';
import AppProviders from '@/components/app_initializer/AppProviders';
import AppRouter from '@/components/app_initializer/AppRouter';

export default function RootLayout() {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});