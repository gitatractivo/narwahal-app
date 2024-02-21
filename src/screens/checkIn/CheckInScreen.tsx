import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, fontSize, fonts} from '../../helper';

type Props = {};

const CheckInScreen = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>CheckInScreen</Text>
    </View>
  );
};

export default CheckInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  text: {
    color: colors.black,
    fontSize: fontSize(20),
    fontFamily: fonts.semiBold,
  },
});
