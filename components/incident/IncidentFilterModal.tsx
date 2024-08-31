import { View, Platform, Modal, Text, Button, SafeAreaView } from 'react-native';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import FiltersSelectPopOver from './FiltersSelectPopOver';

export default function IncidentFilterModal({ open, close, setFilterParams }: { setFilterParams: any, open: boolean, close: (e: boolean) => any }) {

  const isPresented = router.canGoBack();

  return (
    <Modal
      animationType="fade"
      style={{ flex: 1 }}
      visible={open}>

      <SafeAreaView>

        <Button title="Close" onPress={() => close(false)} />

        <FiltersSelectPopOver
          open={open}
          setFilterParams={(filter: string) => setFilterParams(filter)}
        />
      </SafeAreaView >
    </Modal >
  );
}
