// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';

export function TabBarIcon({ style, name, color }: { style?: any, name: any, color?: any }) {
  return <MaterialCommunityIcons color={color} name={name} size={28} style={[{ marginBottom: -3 }, style]} />;
}
