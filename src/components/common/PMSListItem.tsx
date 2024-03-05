import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ListItemProps } from '../../interface/common';
import { colors, fontSize, fonts, wp } from '../../helper';
import { formatDate } from '../../helper/date';

const PMSListItem = ({ item, onPress }: ListItemProps) => {
  return (
      <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.7}
          style={styles.container}>
        <View style={styles.titleView}>
          <View style={styles.titleSubView}>
            <Text numberOfLines={1} style={styles.titleText}>
              {item?.description && item?.description?.length < 25
                  ? item?.description
                  : item?.description?.slice(0, 15) + '...'}
            </Text>
            <View
                style={[
                  styles.tagView,
                  {
                    backgroundColor:
                        item?.pic == 1 ? colors.primaryLight : colors.purpleLight,
                  },
                ]}>
              <Text
                  style={[
                    styles.tagText,
                    {
                      color:
                          item?.pic == 1 ? colors.primaryDark : colors.purple,
                    },
                  ]}>
                {item?.pic}
              </Text>
            </View>
            <Text style={styles.picText}>
              {'PIC: '}
            </Text>
            <Text style={styles.erText}>
              {'Er.2'}
            </Text>
          </View>
          <Text style={styles.dateText}>{formatDate(item?.due as string)}</Text>
        </View>
        <Text numberOfLines={1} style={styles.descText}>
          {item?.interval}
        </Text>
      </TouchableOpacity>
  );
};

export default PMSListItem;

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
    paddingVertical: wp(1),
    borderRadius: wp(1.33),
    marginHorizontal: wp(2),
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
  picText: {
    color: colors.darkGrey,
    fontSize: fontSize(12),
    fontFamily: fonts.regular,
  },
  erText: {
    color: colors.black,
    fontSize: fontSize(12),
    fontFamily: fonts.regular,
  },
  descText: {
    marginTop: wp(2),
    fontSize: fontSize(12),
    color: colors.darkGrey,
    fontFamily: fonts.regular,
  },
});