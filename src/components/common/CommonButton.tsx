import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import {CommonButtonProps} from '../../interface/common';
import {fontSize, hp, wp, colors, fonts} from '../../helper';

const CommonButton = ({
  title,
  onPress,
  additionalBtnStyle,
  additionalTitleStyle,
  isBtnDisable = false,
}: CommonButtonProps) => {
  return (
    <TouchableOpacity
      disabled={isBtnDisable}
      style={[
        styles.btnStyle,
        {backgroundColor: isBtnDisable ? colors.grey : colors.primary},
        additionalBtnStyle,
      ]}
      activeOpacity={0.8}
      onPress={onPress}>
      <View style={styles.subBtnView}>
        <Text style={[styles.btnText, additionalTitleStyle]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CommonButton;

const styles = StyleSheet.create({
  btnStyle: {
    width: wp(60),
    height: hp(6.5),
    alignItems: 'center',
    borderRadius: wp(1.7),
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  btnText: {
    color: colors.white,
    alignSelf: 'center',
    fontFamily: fonts.medium,
    fontSize: fontSize(20),
  },
  subBtnView: {
    flexDirection: 'row',
  },
});
