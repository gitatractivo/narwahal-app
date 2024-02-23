import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {ListItemProps} from '../../interface/common';
import {colors, fontSize, fonts, wp} from '../../helper';

const InventorySecondFloorList = ({item, onPress}: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.container}>
      <View style={styles.titleView}>
        <Text numberOfLines={1} style={styles.titleText}>
          {`${item?.title}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default InventorySecondFloorList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(5),
    borderBottomWidth: wp(0.2),
    borderBlockColor: colors.grey,
  },
  titleView: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    color: colors.black,
    fontSize: fontSize(16),
    fontFamily: fonts.regular,
  },
});
