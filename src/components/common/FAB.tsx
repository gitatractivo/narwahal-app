import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import SvgIcons from '../../helper/SvgIcons';
import {FABProps} from '../../interface/common';
import {colors, fontSize, hp, wp, fonts} from '../../helper/index';

const FAB = ({onPress}: FABProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.roundButton, styles.shadowStyle]}
      onPress={onPress}>
      <SvgIcons iconName="checkMark" />
      <Text style={styles.plusStyle}>{'Complete'}</Text>
    </TouchableOpacity>
  );
};

export default FAB;

const styles = StyleSheet.create({
  roundButton: {
    zIndex: 1,
    right: wp(5),
    bottom: hp(2),
    position: 'absolute',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: wp(100),
    paddingVertical: wp(3),
    justifyContent: 'center',
    paddingHorizontal: wp(4),
    backgroundColor: colors.primary,
  },
  plusStyle: {
    marginLeft: wp(1),
    color: colors.white,
    fontSize: fontSize(18),
    fontFamily: fonts.medium,
  },
  shadowStyle: {
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    shadowRadius: 10,
    shadowOpacity: 0.3,
    shadowColor: colors.black,
  },
});
