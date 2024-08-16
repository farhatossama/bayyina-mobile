import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { ApplicationProvider, } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { useColorScheme } from '@/hooks/useColorScheme';
import { I18nManager, Platform } from 'react-native';
import React, { useState } from 'react';
import LoginScreen from '../components/auth/login';
import { RootSiblingParent } from 'react-native-root-siblings';
import * as Updates from 'expo-updates';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (

    <RootSiblingParent>
      <ApplicationProvider {...eva} theme={eva.light}>

        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          {
            isLogged ?
              <Stack>
                <Stack.Screen name="+not-found" />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              </Stack> :
              <LoginScreen loggedInOnChange={(e: any) => setIsLogged(e)} />
          }
        </ThemeProvider>
      </ApplicationProvider>
    </RootSiblingParent>

  );
}
