import React from 'react';
import {StyleSheet} from 'react-native';
import DropShadow from 'react-native-drop-shadow';

import {colors} from '../../helper';
import {ShadowProps} from '../../interface/common';

function Shadow({shadowStyle, children}: ShadowProps) {
  return (
    <DropShadow style={[styles.shadowStyle, shadowStyle]}>
      {children}
    </DropShadow>
  );
}

const styles = StyleSheet.create({
  shadowStyle: {
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 5,
    shadowOpacity: 0.5,
    shadowColor: colors.dropShadow,
  },
});

export default Shadow;
