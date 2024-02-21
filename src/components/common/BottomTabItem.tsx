import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import SvgIcons from '../../helper/SvgIcons';
import {BottomTabItemProps} from '../../interface/common';
import {colors, fontSize, fonts, hp, isIos, wp} from '../../helper';

const BottomTabItem = ({focused, iconName, tabTitle}: BottomTabItemProps) => {
  return (
    <View>
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: focused ? colors.primaryMedium : 'transparent',
          },
        ]}>
        <SvgIcons
          iconName={iconName}
          iconColor={focused ? colors.primaryDark : colors.xxDarkGrey}
        />
      </View>
      <Text
        style={[
          styles.tabText,
          {
            color: focused ? colors.primaryDark : colors.xxDarkGrey,
          },
        ]}>
        {tabTitle}
      </Text>
    </View>
  );
};

export default BottomTabItem;

const styles = StyleSheet.create({
  iconContainer: {
    width: wp(17),
    height: wp(8.5),
    alignItems: 'center',
    borderRadius: wp(100),
    justifyContent: 'center',
    marginTop: isIos ? hp(1.8) : 0,
  },
  tabText: {
    marginTop: wp(0.5),
    alignSelf: 'center',
    fontSize: fontSize(13),
    fontFamily: fonts.regular,
  },
});
