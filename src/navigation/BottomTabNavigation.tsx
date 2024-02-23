import React from 'react';
import {StyleSheet} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {BottomTabItem} from '../components';
import PMSscreen from '../screens/pms/PMSscreen';
import CheckInScreen from '../screens/checkIn/CheckInScreen';
import PMSdetailScreen from '../screens/pms/PMSdetailScreen';
import CheckOutScreen from '../screens/checkOut/CheckOutScreen';
import {colors, fontSize, fonts, hp, isIos, wp} from '../helper';
import InventoryScreen from '../screens/inventory/InventoryScreen';

export type BottomStackParamList = {
  PMSscreen: undefined;
  CheckInScreen: undefined;
  CheckOutScreen: undefined;
  InventoryScreen: undefined;
  PMSdetailScreen: { id: string; description: string, status: string, } | undefined;
};

const PMSstack = createNativeStackNavigator();

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
        component={CheckInScreen}
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

export const styles = StyleSheet.create({
  iconContainer: {
    width: wp(17),
    height: wp(8.5),
    alignItems: 'center',
    borderRadius: wp(100),
    justifyContent: 'center',
    marginTop: isIos ? hp(0) : 0,
  },
  tabText: {
    marginTop: wp(0.5),
    fontSize: fontSize(13),
    fontFamily: fonts.regular,
  },
});
