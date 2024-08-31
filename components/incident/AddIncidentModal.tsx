import { View, Platform, Modal, Text, Button, SafeAreaView } from 'react-native';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

export default function AddIncident(props: any) {

  const isPresented = router.canGoBack();
  return (
    <Modal
      animationType="fade"
      style={{ flex: 1, backgroundColor: 'red' }}
      visible={props.open}
      onRequestClose={() => props.close(false)}>
      <SafeAreaView>

        <Text>Modal Content Here</Text>
        <Button title="Close" onPress={() => props.close(false)} />
      </SafeAreaView >
    </Modal >
  );
}
