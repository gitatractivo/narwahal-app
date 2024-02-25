import React, { useEffect } from 'react';
import {
    View,
    Image,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Button, Alert,
} from 'react-native';

import SvgIcons from '../../helper/SvgIcons';
import { SearchBoxProps } from '../../interface/common';
import { colors, fontSize, fonts, hp, icons, isIos, wp } from '../../helper';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native-svg';
import { NativeModules } from 'react-native';
const { ConnectivityModule } = NativeModules;

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
  const { openDrawer } = useNavigation();

    const onButtonPress = async () => {
        const wakeup = await ConnectivityModule.wakeup()
        if (wakeup) {
            const connect = await ConnectivityModule.connect()
            if (connect) {
                Alert.alert(
                    'Connection Successful',
                    'Your device is now connected.',
                    [
                        { text: 'OK', onPress: () => console.log('OK Pressed') }
                    ],
                    { cancelable: false }
                );
            } else {
                Alert.alert(
                    'Connection Failed',
                    'Unable to establish a connection.',
                    [
                        { text: 'OK', onPress: () => console.log('OK Pressed') }
                    ],
                    { cancelable: false }
                );
            }
        } else {
            Alert.alert(
                'Connection Failed',
                'Unable to wake up the device.',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') }
                ],
                { cancelable: false }
            );
        }
    }
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

          {/*  @ts-ignore*/}
          <Button title="Connect" onPress={() => onButtonPress()} color={colors.black}  style={styles.button} />


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
    button: {
      fontSize:14,
        borderRadius:8,
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
  connect: {
    flex: 1,
    color: colors.black,
    fontSize: fontSize(13),
    fontFamily: fonts.regular,
    backgroundColor: colors.black,
  }
});
