import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {colors, fontSize, fonts, wp} from '../../helper';

const RadioButton = ({isSelected, title, onPress}: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.container}>
      <Text style={styles.titleText}>{title}</Text>
      <View style={styles.radioView}>
        {isSelected && <View style={styles.activeDot} />}
      </View>
    </TouchableOpacity>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: wp(4),
    justifyContent: 'space-between',
  },
  titleText: {
    color: colors.black,
    fontSize: fontSize(16),
    fontFamily: fonts.regular,
  },
  radioView: {
    width: wp(5.33),
    height: wp(5.33),
    marginRight: wp(3),
    borderWidth: wp(0.5),
    alignItems: 'center',
    borderRadius: wp(100),
    justifyContent: 'center',
    borderColor: colors.primary,
  },
  activeDot: {
    width: wp(2.83),
    height: wp(2.83),
    borderRadius: wp(100),
    backgroundColor: colors.primary,
  },
});
