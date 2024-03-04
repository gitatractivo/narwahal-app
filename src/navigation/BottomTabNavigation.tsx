import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {colors, hp, wp} from '../helper';
import {BottomTabItem} from '../components';
import PMSscreen from '../screens/pms/PMSscreen';
import CheckInScreen from '../screens/checkIn/CheckInScreen';
import PMSdetailScreen from '../screens/pms/PMSdetailScreen';
import CheckOutScreen from '../screens/checkOut/CheckOutScreen';
import ConnectScreen from '../screens/connect/ConnectScreen.tsx';
import InventoryScreen from '../screens/inventory/InventoryScreen';
import CheckInDetailScreen from '../screens/checkIn/CheckInDetailScreen.tsx';

export type BottomStackParamList = {
  PMSscreen: undefined;
  CheckInScreen: undefined;
  CheckOutScreen: undefined;
  InventoryScreen: undefined;
  PMSdetailScreen:
    | {id: string; description: string; status: string}
    | undefined;
  ConnectScreen: undefined;
};

const PMSstack = createNativeStackNavigator();
const CheckInStack = createNativeStackNavigator();

function PMSstackScreen() {
  return (
    <PMSstack.Navigator screenOptions={{headerShown: false}}>
      <PMSstack.Screen
        name="PMSscreen"
        //@ts-ignore
        component={PMSscreen}
      />
      <PMSstack.Screen
        name="PMSdetailScreen"
        //@ts-ignore
        component={PMSdetailScreen}
      />
    </PMSstack.Navigator>
  );
}

function CheckInStackScreen() {
  return (
    <CheckInStack.Navigator screenOptions={{headerShown: false}}>
      <CheckInStack.Screen
        name="CheckInScreen"
        //@ts-ignore
        component={CheckInScreen}
      />
      <CheckInStack.Screen
        name="CheckInDetailScreen"
        //@ts-ignore
        component={CheckInDetailScreen}
      />
    </CheckInStack.Navigator>
  );
}

const Tab = createBottomTabNavigator<BottomStackParamList>();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: hp(10),
          borderTopWidth: 0,
          backgroundColor: colors.primaryLight,
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.4,
          shadowRadius: 12,
          elevation: 10,
          shadowColor: colors.black,
          paddingHorizontal: wp(3),
        },
      }}>
      <Tab.Screen
        name="PMSscreen"
        component={PMSstackScreen}
        options={{
          tabBarActiveTintColor: 'black',
          tabBarIcon: ({focused}) => (
            <BottomTabItem
              focused={focused}
              iconName={'wrench'}
              tabTitle={'PMS'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CheckInScreen"
        component={CheckInStackScreen}
        options={{
          tabBarActiveTintColor: 'black',
          tabBarIcon: ({focused}) => (
            <BottomTabItem
              focused={focused}
              iconName={'checkIn'}
              tabTitle={'Check in'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CheckOutScreen"
        component={CheckOutScreen}
        options={{
          tabBarActiveTintColor: 'black',
          tabBarIcon: ({focused}) => (
            <BottomTabItem
              focused={focused}
              iconName={'checkOut'}
              tabTitle={'Check out'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="InventoryScreen"
        component={InventoryScreen}
        options={{
          tabBarActiveTintColor: 'black',
          tabBarIcon: ({focused}) => (
            <BottomTabItem
              focused={focused}
              iconName={'box'}
              tabTitle={'Inventory'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
