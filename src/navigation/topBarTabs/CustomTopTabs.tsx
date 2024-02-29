import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {colors, fontSize, fonts} from '../../helper';

const Tab = createMaterialTopTabNavigator();

const CustomTopTabs = ({screens}: any) => {
  return (
    <Tab.Navigator
      initialRouteName="Sailing"
      screenOptions={{
        tabBarActiveTintColor: colors.black,
        tabBarInactiveTintColor: colors.darkGrey,
        tabBarLabelStyle: {
          textTransform: 'none',
          fontSize: fontSize(15),
          fontFamily: fonts.medium,
        },
        tabBarStyle: {backgroundColor: colors.white},
        tabBarIndicatorStyle: {backgroundColor: colors.black},
      }}>
      {screens.map((screen: any) => (
        <Tab.Screen
          key={screen?.id}
          name={screen?.name}
          component={screen?.component}
          options={{tabBarLabel: screen?.tabBarLabel}}
        />
      ))}
    </Tab.Navigator>
  );
};

export default CustomTopTabs;
