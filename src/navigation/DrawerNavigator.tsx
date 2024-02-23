import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

// import {CustomDrawer} from '../components';
// import {RoutePage} from '../interface/Navigator';
import BottomTabNavigator from './BottomTabNavigation';
import {colors, wp} from '../helper';
// import BottomTabNavigator from './BottomTabNavigator';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {
          backgroundColor: colors.white,
          borderTopRightRadius: wp(5.8),
          borderBottomRightRadius: wp(5.8),
        },
      }}>
      <Drawer.Screen name={'PMSscreen'} component={BottomTabNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
