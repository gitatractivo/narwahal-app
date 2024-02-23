import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { DetailListItemProps } from '../../interface/common';
import { colors, fontSize, fonts, hp, wp } from '../../helper';

const DetailListItem = ({ item, onPress }: DetailListItemProps) => {
  console.log("item:",item)
  return (
      <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPress}
          style={styles.container}>
        <Text style={styles.titleText}>{item?.material_desc}</Text>
        <View style={styles.tagContainer}>
          <View style={styles.tagView}>
            <Text style={styles.tagText}>{item?.maker_desc}</Text>
          </View>
          <Text style={styles.uniqText}>{item?.id}</Text>
        </View>

        <View style={styles.qtyContainer}>
          <View>
            <Text style={styles.uniqText}>ROB:</Text>
            {/* <Text style={styles.uniqText}>{Pkg. Qty:}</Text> */}
          </View>
          <View>
            <Text style={styles.qtyText}>{item?.rob}</Text>
            {/* <Text style={styles.qtyText}>{item?.pkgQty}</Text> */}
          </View>
          <View style={styles.qtySubView}>
            {/* <Text style={styles.uniqText}>{Working & Replace:}</Text>
          <Text style={styles.uniqText}>{Checkout Qty:}</Text> */}
          </View>
          <View>
            {/* <Text style={styles.qtyText}>{item?.workingReplace}</Text>
          <Text style={styles.qtyText}>{item?.checkoutQty}</Text> */}
          </View>
        </View>
        <View style={styles.greenDot} />
      </TouchableOpacity>
  );
};

export default DetailListItem;

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
  tagContainer: {
    marginTop: wp(1.5),
    alignItems: 'center',
    flexDirection: 'row',
  },
  tagView: {
    borderWidth: wp(0.2),
    marginRight: wp(4.5),
    paddingVertical: wp(1),
    borderRadius: wp(1.33),
    paddingHorizontal: wp(3),
    borderColor: colors.orangeLight,
    backgroundColor: colors.orangexLight,
  },
  tagText: {
    color: colors.orange,
    fontSize: fontSize(12),
    fontFamily: fonts.medium,
  },
  qtyContainer: {
    marginTop: hp(3),
    alignItems: 'center',
    flexDirection: 'row',
  },
  qtySubView: {
    marginLeft: wp(8),
  },
  uniqText: {
    marginTop: hp(1),
    marginRight: wp(3),
    color: colors.darkGrey,
    fontSize: fontSize(13),
    fontFamily: fonts.regular,
  },
  qtyText: {
    marginTop: hp(1),
    color: colors.black,
    fontSize: fontSize(15),
    fontFamily: fonts.medium,
  },
  bottomSheetView: {
    alignItems: 'center',
    borderTopLeftRadius: wp(6.5),
    borderTopRightRadius: wp(6.5),
    backgroundColor: colors.white,
  },
  greenDot: {
    top: wp(3),
    width: wp(3),
    right: wp(3),
    height: wp(3),
    position: 'absolute',
    borderRadius: wp(100),
    backgroundColor: colors.green,
  },
});