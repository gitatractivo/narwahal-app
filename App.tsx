import React from 'react';
import {StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';

import RootNavigation from './src/navigation/Navigation';
import {colors} from './src/helper';
import {addEventListener} from './src/bindings/LocateModule';

const App = () => {
    addEventListener('LocateTag', (location) => {
        console.log('Location changed:', location);
    });
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
