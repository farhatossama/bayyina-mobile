
import { unAuthorized } from '@/features/authorize/authorizeSlice';
import { useAppDispatch } from '@/redux/hooks';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React from 'react';
import { Pressable, View, Text } from 'react-native';

export default function CustomDrawerContent(props: any) {
  const dispatch = useAppDispatch();
  const logOut = () => {

    dispatch(unAuthorized())
  }
  return (<>
    <View
      style={{ flex: 1 }}>

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props}></DrawerItemList>
      </DrawerContentScrollView>
      <Pressable onPress={logOut}>
        <Text style={{ padding: 20, paddingBottom: 30, color: "#ffffff" }}>
          تسجيل الخروج
        </Text>
      </Pressable>
    </View>
  </>

  );
}
