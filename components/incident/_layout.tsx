// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import * as SplashScreen from 'expo-splash-screen';
// import { useEffect, useRef } from 'react';
// import 'react-native-reanimated';
// import { ApplicationProvider, } from '@ui-kitten/components';
// import * as eva from '@eva-design/eva';
// import { useColorScheme } from '@/hooks/useColorScheme';
// import { Platform, View } from 'react-native';
// import React, { useState } from 'react';
// import { RootSiblingParent } from 'react-native-root-siblings';
// import * as Device from 'expo-device';
// import * as Notifications from 'expo-notifications';
// import Constants from 'expo-constants';
// import { Provider } from 'react-redux';
// import { store } from '@/redux/store';
// import StoreIndex from '../components/approuter/StoreIndex';
// import { StyleSheet } from 'react-native';
// // Handle push notifications
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

// async function registerForPushNotificationsAsync() {
//   if (Platform.OS === 'android') {
//     await Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }

//   if (Device.isDevice) {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       throw new Error('Permission not granted to get push token for push notification!');
//     }
//     const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
//     if (!projectId) {
//       throw new Error('Project ID not found');
//     }
//     try {
//       const pushTokenString = (
//         await Notifications.getExpoPushTokenAsync({ projectId })
//       ).data;
//       console.log(pushTokenString);
//       return pushTokenString;
//     } catch (e) {
//       throw new Error(`${e}`);
//     }
//   } else {
//     throw new Error('Must use physical device for push notifications');
//   }
// }

// // Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {

//   const colorScheme = useColorScheme();
//   const [loaded] = useFonts({ SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'), });
//   const [isLogged, setIsLogged] = useState<any>(false);
//   const [expoPushToken, setExpoPushToken] = useState('');
//   const [notification, setNotification] = useState<Notifications.Notification | undefined>(undefined);
//   const notificationListener = useRef<Notifications.Subscription>();
//   const responseListener = useRef<Notifications.Subscription>();


//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded]);

//   useEffect(() => {
//     registerForPushNotificationsAsync()
//       .then(token => setExpoPushToken(token ?? ''))
//       .catch(error => console.error(error));

//     notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
//       setNotification(notification);
//     });

//     responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
//       console.log(response);
//     });

//     return () => {
//       notificationListener.current && Notifications.removeNotificationSubscription(notificationListener.current);
//       responseListener.current && Notifications.removeNotificationSubscription(responseListener.current);
//     };
//   }, []);




//   if (isLogged === null || !loaded) {
//     // Render a loading screen or spinner while checking authentication status
//     return null; // Or you can use a custom loading component
//   }

//   return (
//     <Provider store={store}>
//       <RootSiblingParent>
//         <ApplicationProvider {...eva} theme={eva.light}>
//           <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//             <View style={styles.container}>
//               <StoreIndex></StoreIndex>
//             </View>
//           </ThemeProvider>
//         </ApplicationProvider>
//       </RootSiblingParent>
//     </Provider>
//   );

// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
// });