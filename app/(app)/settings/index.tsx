import { StyleSheet, View, StatusBar, SafeAreaView, I18nManager,Text } from 'react-native';

import IncidentListComponent from '@/components/incident/IncidentListComponent';
import { getIncidents } from '@/components/incident/IncidentApi';
import { useEffect, useState } from 'react';
import { useIsFocused } from "@react-navigation/native";

export default function SettingsScreen() {



    return (
        <SafeAreaView style={styles.container2}>

            <View>
                <Text>Settings </Text>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    title: {
        writingDirection: I18nManager.isRTL ? "rtl" : "ltr",
        padding: 10,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    container: {
        paddingTop: 20,
    },
    container2: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
});
