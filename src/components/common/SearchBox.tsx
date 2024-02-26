import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Button, Alert, Text
} from 'react-native';
import Modal from "react-native-modal";

import SvgIcons from '../../helper/SvgIcons';
import { SearchBoxProps } from '../../interface/common';
import { colors, fontSize, fonts, hp, icons, isIos, wp } from '../../helper';
import { useNavigation } from '@react-navigation/native';
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const onButtonPress = async () => {

    try {
      const wakeup = await ConnectivityModule.wakeup()
      if (wakeup) {


        const connect = await ConnectivityModule.connect()
        console.log("connect", connect)
        if (connect) {
          Alert.alert(
            'Connection Successful',
            'Your device is now connected.',
            [
              { text: 'OK', onPress: () => console.log('OK Pressed') }
            ],
            { cancelable: false }
          );
        }
        else {
          Alert.alert(
            'Connection Failed',
            'Unable to Connect to device.',
            [
              { text: 'OK', onPress: () => console.log('OK Pressed') }
            ],
            { cancelable: false }
          );
        }

      }
    } catch (error) {
      console.log("error", error)
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
          onPress={toggleDrawer}
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
        <Modal
          isVisible={isDrawerOpen}
          animationIn="slideInLeft"
          animationOut="slideOutLeft"
          onBackButtonPress={toggleDrawer}
          onBackdropPress={toggleDrawer}
        >
          <View style={styles.drawerContainer}>
            <TouchableOpacity activeOpacity={0.7} style={styles.connectButton} onPress={onButtonPress}>
              <Text style={styles.connectText}>Connect</Text>
            </TouchableOpacity>

            {/* Add more buttons as needed */}
            <TouchableOpacity style={styles.closeButton} onPress={toggleDrawer}>
              <Text>Close Drawer</Text>
            </TouchableOpacity>
          </View>
        </Modal>

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
    fontSize: 14,
    borderRadius: 8,
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
  }, drawerContainer: {
    flex: 1,
    position: 'absolute',
    left: -20,
    width: "70%",
    top: -20,
    bottom: -20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 50,
  },
  drawerButton: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'black',
    borderRadius: 5,
  },
  drawerButtonText: {
    fontSize: 18,
    color: 'black',
  },
  closeButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 18,
    color: 'black',
  },
  connectButton: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'black',
    borderRadius: 5,
  },
  connectText: {
    fontSize: 18,
    color: 'white',
  }
});
