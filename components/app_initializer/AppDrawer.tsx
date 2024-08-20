
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import CustomDrawerContent from './CustomDrawerContent';


export default function AppDrawer() {

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer 
            
            drawerContent={CustomDrawerContent}>
                <Drawer.Screen
                    name="(app)/home/index" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: 'رئيسي',
                        title: 'رئيسي',
                    }}
                />
                <Drawer.Screen
                    name="(app)/incident/index" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: 'أحداث',
                        title: 'أحداث',
                    }}
                />
                <Drawer.Screen
                    name="(app)/settings/index" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: 'إعدادات',
                        title: 'إعدادات',
                    }}
                />

                <Drawer.Screen
                    name="+not-found" // This is the name of the page and must match the url from root
                    options={{
                        drawerItemStyle: { display: 'none' }
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
}
