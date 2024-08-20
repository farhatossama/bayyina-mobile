
import React from 'react';
import useInitialStorageLoad from '@/hooks/useInitialStorageLoad';
import AppDrawer from './AppDrawer';
import { useAppSelector } from '@/redux/hooks';
import { Stack } from 'expo-router';
import { View } from 'react-native';
import LoginScreen from '@/app/sign-in';


export default function AppRouter() {
    useInitialStorageLoad()
    const isLogged: any = useAppSelector((state) => state.authorized.isLogged);

    return (<>
        {
            isLogged ?

                <AppDrawer />
                :
                <LoginScreen />
        }
    </>

    );
}
