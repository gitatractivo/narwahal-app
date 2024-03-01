import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import SvgIcons from '../../helper/SvgIcons';
import {FABProps} from '../../interface/common';
import {colors, fontSize, hp, wp, fonts} from '../../helper/index';

const FAB = ({onPress, status, iconName}: FABProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.roundButton, styles.shadowStyle]}
      onPress={onPress}>
      <SvgIcons iconName={iconName || "checkMark"} />
      {status && <Text style={styles.titleText}>{status}</Text>}
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
    paddingHorizontal: wp(5.5),
    backgroundColor: colors.primary,
  },
  titleText: {
    marginLeft: wp(2),
    color: colors.white,
    fontSize: fontSize(18),
    fontFamily: fonts.medium,
  },
  shadowStyle: {
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 3,
    shadowRadius: 8,
    shadowOpacity: 0.2,
    shadowColor: colors.black,
  },
});
