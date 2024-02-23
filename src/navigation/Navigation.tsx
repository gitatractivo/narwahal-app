import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BottomTabNavigator from './BottomTabNavigation';
import DrawerNavigation from './DrawerNavigator';

export type RootStackParamList = {
  PMSscreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={'PMSscreen'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="PMSscreen" component={DrawerNavigation} />
    </Stack.Navigator>
  );
};

export default Navigation;
