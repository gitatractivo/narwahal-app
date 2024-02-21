import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BottomTabNavigator from './BottomTabNavigation';

export type RootStackParamList = {
  HomeScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={'HomeScreen'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};

export default Navigation;
