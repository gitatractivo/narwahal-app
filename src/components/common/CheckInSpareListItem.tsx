import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { DetailListItemProps } from '../../interface/common';
import { colors, fontSize, fonts, hp, wp } from '../../helper';

const CheckInSpareList = ({ item, onPress }: any) => {
  return (
    <View
      style={styles.container}>
      <Text style={styles.titleText}>{item?.title}</Text>
      <Text style={styles.descText}>{item?.desc}</Text>
      

      <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={styles.innerDiv}>
        <View style={styles.innerHeading}>
          <Text style={styles.innerHeadingText}>ID: View Details</Text>
        </View>
        <View style={styles.innerContainer}>
          <View style={styles.flexContainer}>

            <View style={styles.spanContainer}>
              <Text >Scanned Qty:</Text>
              <Text style={styles.valueText}>10</Text>
            </View>
            <View style={styles.spanContainer}>
              <Text >Check-in Qty:</Text>
              <Text style={styles.valueText}>5</Text>
            </View>
          </View>
          <View
            style={[
              styles.tagView,
              {
                backgroundColor:
                  item?.tag == 'Reconditioned'
                    ? colors.orangexLight
                    : colors.greenxLight,
                borderColor:
                  item?.tag == 'Reconditioned'
                    ? colors.orangeLight
                    : colors.greenLight,
              },
            ]}>
            <Text
              style={[
                styles.tagText,
                {
                  color:
                    item?.tag == 'Reconditioned' ? colors.orange : colors.green,
                },
              ]}>
              {item?.tag}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CheckInSpareList;

const styles = StyleSheet.create({
  container: {
    padding: wp(5.5),
    borderBottomWidth: wp(0.2),
    borderBottomColor: colors.grey,
    flex:1,
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
