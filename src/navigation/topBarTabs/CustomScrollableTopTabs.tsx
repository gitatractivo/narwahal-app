import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {colors, fontSize, fonts, isIos, wp} from '../../helper';

const Tab = createMaterialTopTabNavigator();

const CustomScrollableTopTabs = ({screens}: any) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled:true,
        tabBarActiveTintColor: colors.black,
        tabBarInactiveTintColor: colors.darkGrey,
        tabBarLabelStyle: {
          textTransform: 'none',
          fontSize: fontSize(15),
          fontFamily: fonts.medium,
        },
        tabBarStyle: {backgroundColor: colors.white},
        tabBarIndicatorStyle: {backgroundColor: colors.black},
        tabBarItemStyle:{
          width: 'auto', 
          alignItems:'center', 
          justifyContent:"center", 
          paddingHorizontal:isIos ? wp(5) :wp(6),
        }
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

export default CustomScrollableTopTabs;
