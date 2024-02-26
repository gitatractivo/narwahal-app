import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {DetailDataProps, DetailListItemProps, RfidProductProp} from '../../interface/common';
import {colors, fontSize, fonts, hp, wp} from '../../helper';

const CheckOutListItem = ({ item, onPress }: { item: RfidProductProp, onPress:any}) => {
  return (
    <View
      style={styles.container}>
      <Text style={styles.titleText}>{item?.product?.material_desc}</Text>
      <Text style={styles.descText}>{item?.rob}</Text>


      <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={styles.innerDiv}>
        <View style={styles.innerHeading}>
          <Text style={styles.innerHeadingText}>ID: {item.rfid}</Text>
        </View>
        <View style={styles.innerContainer}>
          <View style={styles.flexContainer}>

            <View style={styles.spanContainer}>
              <Text >Scanned Qty:</Text>
              <Text style={styles.valueText}>{item.rob}</Text>
            </View>
            <View style={styles.spanContainer}>
              <Text >Check-out Qty:</Text>
              <Text style={styles.valueText}>{item.rob}</Text>
            </View>
          </View>
          <View
            style={[
              styles.tagView,
              {
                backgroundColor:
                  false
                    ? colors.orangexLight
                    : colors.greenxLight,
                borderColor:
                  false
                    ? colors.orangeLight
                    : colors.greenLight,
              },
            ]}>
            <Text
              style={[
                styles.tagText,
                {
                  color:
                    false ? colors.orange : colors.green,
                },
              ]}>
              New
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CheckOutListItem;

const styles = StyleSheet.create({
  container: {
    padding: wp(5.5),
    borderBottomWidth: wp(0.2),
    borderBottomColor: colors.grey,
    flex: 1,
    flexDirection: 'column',
    gap: wp(1.5),
  },
  titleText: {
    color: colors.black,
    fontSize: fontSize(15),
    fontFamily: fonts.medium,
  },
  descText: {
    marginVertical: wp(0.5),
    color: colors.darkGrey,
    fontSize: fontSize(14),
    fontFamily: fonts.medium,
  },
  tagContainer: {
    marginTop: wp(1.5),
    alignItems: 'center',
    flexDirection: 'row',
  },
  tagView: {
    borderWidth: wp(0.2),
    paddingVertical: wp(1),
    borderRadius: wp(1.33),
    paddingHorizontal: wp(3),
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
    marginRight: wp(3),
    color: colors.darkGrey,
    fontSize: fontSize(13),
    fontFamily: fonts.regular,
  },
  qtyText: {
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
  marginLeft: {
    marginLeft: wp(3),
  },
  innerDiv: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(2),
    borderWidth: 0.5,
    borderColor: '#dddddd',
    overflow: 'hidden',
  },
  innerHeading: {
    width: '100%',
    paddingVertical: wp(1.5),
    paddingHorizontal: wp(5),
    backgroundColor: "#e5f2fd",

  },
  innerHeadingText: {
    color: "#47AFFF",
    fontSize: fontSize(15),
    fontFamily: fonts.bold,
  },
  innerContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: wp(5),
    paddingVertical: wp(3),
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  spanContainer: {
    flex: 1,
    gap: wp(.5),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: 'auto'
  }, valueText: {
    color: colors.black,
    // opacity: 0.9
  },
  flexContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: 231,
    // minWidth: 231,

  }
});
