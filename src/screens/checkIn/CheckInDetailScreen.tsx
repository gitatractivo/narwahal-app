import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

import {checkInDetailList} from '../../helper/dataConstant';
import {CheckInDetailListItem, FAB, FilterBar} from '../../components';
import {ListFooterComponent, colors, commonStyles, fontSize, fonts, wp} from '../../helper';

const CheckInDetailScreen = () => {
  const renderDetail = ({item}: any) => {
    return <CheckInDetailListItem item={item} onPress={() => {}} />;
  };

  return (
    <View style={commonStyles.root}>
      <FilterBar />
      <View style={styles.titleView}>
        <Text numberOfLines={1} style={styles.titleText}>
          {`PACKAGED AIR CON. FOR ENG. CONT. ROOM`}
        </Text>
        <Text numberOfLines={1} style={styles.descText}>
          {`Inspect & Retighten - Counterweight, main & guide Bearing CAP`}
        </Text>
      </View>

      <FlatList
        bounces={false}
        data={checkInDetailList}
        renderItem={renderDetail}
        keyExtractor={item => item?.id?.toString()}
        ListFooterComponent={ListFooterComponent}
      />
      <FAB status={'Confirm'} onPress={() => {}} />
    </View>
  );
};

export default CheckInDetailScreen;

const styles = StyleSheet.create({
  titleView: {
    paddingVertical: wp(3),
    paddingHorizontal: wp(5),
    backgroundColor: colors.primaryxLight,
  },
  titleText: {
    color: colors.black,
    fontSize: fontSize(16),
    fontFamily: fonts.medium,
  },
  descText: {
    marginTop: wp(2),
    color: colors.greyText,
    fontSize: fontSize(12),
    fontFamily: fonts.regular,
  },
});
