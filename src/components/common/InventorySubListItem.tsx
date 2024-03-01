import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {colors, fontSize, fonts, hp, wp} from '../../helper';

const InventorySubListItem = ({item, onPress}: any) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={styles.container}>
      <Text style={styles.titleText}>{item?.title}</Text>
      <View style={styles.qtyContainer}>
        <Text style={styles.uniqText}>{`Floor:`}</Text>
        <Text style={styles.qtyText}>{item?.floor}</Text>
        <Text
          style={[styles.uniqText, styles.marginLeft]}>{`Room:`}</Text>
        <Text style={styles.qtyText}>{item?.room}</Text>
        <Text
          style={[styles.uniqText, styles.marginLeft]}>{`Rack:`}</Text>
        <Text style={styles.qtyText}>{item?.rack}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default InventorySubListItem;

const styles = StyleSheet.create({
  container: {
    padding: wp(5.5),
    borderBottomWidth: wp(0.2),
    borderBottomColor: colors.grey,
  },
  titleText: {
    color: colors.black,
    fontSize: fontSize(15),
    fontFamily: fonts.medium,
  },
  qtyContainer: {
    marginTop: hp(2),
    alignItems: 'center',
    flexDirection: 'row',
  },
  uniqText: {
    marginRight: wp(3),
    color: colors.darkGrey,
    fontSize: fontSize(16),
    fontFamily: fonts.regular,
  },
  qtyText: {
    color: colors.black,
    fontSize: fontSize(16),
    fontFamily: fonts.regular,
  },
  marginLeft: {
    marginLeft: wp(3),
  },
});
