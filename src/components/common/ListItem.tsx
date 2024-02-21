import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {ListItemProps} from '../../interface/common';
import {colors, fontSize, fonts, wp} from '../../helper';

const ListItem = ({item, onPress}: ListItemProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.container}>
      <View style={styles.titleView}>
        <View style={styles.titleSubView}>
          <Text numberOfLines={1} style={styles.titleText}>
            {item?.title?.length < 25
              ? `${item?.title}`
              : `${item?.title?.substring(0, 22)}...`}
          </Text>
          <View
            style={[
              styles.tagView,
              {
                backgroundColor:
                  item?.tag == 'PMS' ? colors.primaryLight : colors.purpleLight,
              },
            ]}>
            <Text
              style={[
                styles.tagText,
                {
                  color:
                    item?.tag == 'PMS' ? colors.primaryDark : colors.purple,
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

export default ListItem;

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
