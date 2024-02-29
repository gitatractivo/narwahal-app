import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {colors, fontSize, fonts, wp} from '../../helper';

const CheckInDockListItem = ({item, onPress}: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.container}>
      <View style={styles.titleView}>
        <View style={styles.titleSubView}>
          <Text numberOfLines={1} style={styles.titleText}>
            {`PO NO.- ${item?.PoNo}`}
          </Text>
          <View
            style={[
              styles.tagView,
              {
                backgroundColor:
                  item?.tag == 'Received'
                    ? colors.greenxLight
                    : item?.tag == 'Partial'
                    ? colors.purplexLight
                    : colors.redxLight,
                borderColor:
                  item?.tag == 'Received'
                    ? colors.greenLight
                    : item?.tag == 'Partial'
                    ? colors.purpleLight
                    : colors.redLight,
              },
            ]}>
            <Text
              style={[
                styles.tagText,
                {
                  color:
                    item?.tag == 'Received'
                      ? colors.green
                      : item?.tag == 'Partial'
                      ? colors.purple
                      : colors.red,
                },
              ]}>
              {item?.tag}
            </Text>
          </View>
        </View>
        <Text style={styles.dateText}>{item?.date}</Text>
      </View>
      <Text numberOfLines={1} style={styles.descText}>
        {item?.desc}
      </Text>
    </TouchableOpacity>
  );
};

export default CheckInDockListItem;

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
  titleSubView: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleText: {
    color: colors.black,
    fontSize: fontSize(16),
    fontFamily: fonts.regular,
  },
  tagView: {
    marginLeft: wp(2),
    borderWidth: wp(0.2),
    paddingVertical: wp(1),
    borderRadius: wp(1.33),
    paddingHorizontal: wp(3),
  },
  tagText: {
    fontSize: fontSize(12),
    fontFamily: fonts.medium,
  },
  dateText: {
    color: colors.darkGrey,
    fontSize: fontSize(13),
    fontFamily: fonts.medium,
  },
  descText: {
    marginTop: wp(2),
    fontSize: fontSize(12),
    color: colors.darkGrey,
    fontFamily: fonts.regular,
  },
});
