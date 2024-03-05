import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import SvgIcons from '../../helper/SvgIcons';
import {FABProgressiveProps} from '../../interface/common';
import {colors, fontSize, hp, wp, fonts} from '../../helper/index';
import LinearGradient from 'react-native-linear-gradient';

const FABprogressive = ({onPress, status, iconName, disable, partial}: FABProgressiveProps) => {
  return (
      <TouchableOpacity
        disabled={disable || partial}
        activeOpacity={0.9}
        style={[styles.fabBtnStyle, {
                backgroundColor: disable ?  colors.grey : colors.primary
              }]}
        onPress={onPress}>
          <LinearGradient 
            colors={[
              disable ? '#E5E5E5' :'#47AFFF',
              disable ? '#E5E5E5' :'#47AFFF',
              disable ? '#E5E5E5' : partial ? '#8FCEFF' : '#47AFFF']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            locations={[0,0.5,0.5]}
            style={styles.linearGradientView}
          >
            <SvgIcons iconName={iconName || "checkMark"} iconColor={disable ? colors.xDarkGrey : colors.white } />
            {status && <Text style={[styles.titleText, {color: disable ? colors.xDarkGrey : colors.white}]}>
              {status}
            </Text>}
          </LinearGradient>
      </TouchableOpacity>
  );
};
export default FABprogressive;

const styles = StyleSheet.create({
  fabBtnStyle: {
    zIndex: 1,
    right: wp(5),
    // height: hp(6),
    bottom: hp(2),
    position: 'absolute',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: wp(100),
    justifyContent: 'center',
    // paddingHorizontal: wp(4),
    backgroundColor: colors.primary,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 3,
    shadowRadius: 8,
    shadowOpacity: 0.2,
    shadowColor: colors.black,
  },
  titleText: {
    marginLeft: wp(1.5),
    color: colors.white,
    fontSize: fontSize(18),
    fontFamily: fonts.medium,
  },
  linearGradientView: {
    height: hp(6),
    paddingHorizontal: wp(4),
    borderRadius: wp(100),
    flexDirection: 'row',
     alignItems: 'center'
  }
});
