import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import {colors, fontSize, fonts, wp} from '../../helper';

const SecondaryButton = ({
  title,
  onPress,
  isSelected,
  customBtnStyle,
  customTitleStlye,
}: any) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.buttonStyle,
        {backgroundColor: isSelected ? colors.primary : colors.white},
        customBtnStyle,
      ]}>
      <Text
        style={[
          styles.titleText,
          {color: isSelected ? colors.white : colors.primary},
          customTitleStlye,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default SecondaryButton;

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: wp(2),
    borderWidth: wp(0.2),
    paddingVertical: wp(2),
    paddingHorizontal: wp(4),
    borderColor: colors.primary,
  },
  titleText: {
    color: colors.primary,
    fontSize: fontSize(12),
    fontFamily: fonts.medium,
  },
});
