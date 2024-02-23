import React from 'react';
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import SvgIcons from '../../helper/SvgIcons';
import {SearchBoxProps} from '../../interface/common';
import {colors, fontSize, fonts, hp, icons, isIos, wp} from '../../helper';
import {useNavigation} from '@react-navigation/native';

const SearchBox = ({
  value,
  onChange,
  autoFocus,
  maxLength,
  blurOnSubmit,
  onChangeText,
  keyboardType,
  returnKeyType,
  editable = true,
  onSubmitEditing,
  additionalStyle,
  secureTextEntry = false,
  autoCapitalize = 'sentences',
}: SearchBoxProps) => {
  //@ts-ignore
  const {openDrawer} = useNavigation();
  return (
    <>
      <SafeAreaView />
      <View style={[styles.inputContainer, additionalStyle]}>
        <TouchableOpacity
          onPress={() => openDrawer()}
          activeOpacity={0.7}
          style={styles.marginRight}>
          <SvgIcons iconName="menu" />
        </TouchableOpacity>
        <TextInput
          value={value}
          editable={editable}
          onChange={onChange}
          autoCorrect={false}
          maxLength={maxLength}
          placeholder={'Search items'}
          style={styles.inputStyle}
          onChangeText={onChangeText}
          autoFocus={false || autoFocus}
          autoCapitalize={autoCapitalize}
          onSubmitEditing={onSubmitEditing}
          secureTextEntry={secureTextEntry}
          placeholderTextColor={colors.xDarkGrey}
          blurOnSubmit={false || blurOnSubmit}
          returnKeyType={returnKeyType || 'next'}
          keyboardType={keyboardType || 'default'}
        />
        <TouchableOpacity activeOpacity={0.7} style={styles.marginLeft}>
          <Image source={icons.profile} style={styles.profileImage} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SearchBox;

const styles = StyleSheet.create({
  inputContainer: {
    width: wp(92),
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: wp(0.2),
    borderRadius: wp(1.7),
    marginVertical: hp(2),
    borderColor: colors.grey,
    paddingHorizontal: wp(3),
    paddingVertical: isIos ? hp(1) : 0,
  },
  inputStyle: {
    flex: 1,
    color: colors.black,
    fontSize: fontSize(18),
    fontFamily: fonts.regular,
  },
  marginRight: {
    marginRight: wp(2),
  },
  marginLeft: {
    marginLeft: wp(2),
  },
  profileImage: {
    width: wp(8.5),
    height: wp(8.5),
  },
});
