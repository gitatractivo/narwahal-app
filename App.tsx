import React from 'react';
import {StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';

import RootNavigation from './src/navigation/Navigation';
import {colors} from './src/helper';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar
        animated
        barStyle={'dark-content'}
        backgroundColor={colors.white}
      />
      <RootNavigation />
    </NavigationContainer>
  );
};

export default App;
