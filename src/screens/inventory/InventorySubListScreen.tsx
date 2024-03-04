import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

import SvgIcons from '../../helper/SvgIcons';
import {inventorySubList} from '../../helper/dataConstant';
import {ListFooterComponent, colors, commonStyles, fontSize, fonts, wp} from '../../helper';
import {InventoryFilterModal, InventorySubListItem} from '../../components';

const InventorySubListScreen = ({route, navigation}: any) => {
  const title = route?.params?.title;

  const [filterModal, setFilterModal] = useState<boolean>(false);

  const renderDetail = ({item}: any) => {
    return <InventorySubListItem 
            item={item} 
            onPress={() => navigation.navigate('InventoryDetailScreen', {title: title})} 
            />;
  };

  return (
    <View style={commonStyles.root}>

        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setFilterModal(true)}
            style={styles.statusBarView}>
            <Text style={styles.stausText}>{`Inventory type`}</Text>
            <SvgIcons iconName="chevronRight" />
        </TouchableOpacity>

        <FlatList
            bounces={false}
            data={inventorySubList}
            renderItem={renderDetail}
            keyExtractor={item => item?.id?.toString()}
            ListFooterComponent={ListFooterComponent}
        />
        
        <InventoryFilterModal
            isVisible={filterModal}
            closeFilter={() => setFilterModal(false)}
            onApplyFilterPress={() => setFilterModal(false)}
            onResetPress={() => setFilterModal(false)}
        />

    </View>
  );
};

export default InventorySubListScreen;

const styles = StyleSheet.create({
  scanningFileContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
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
  scanningText: {
    color: colors.greyText,
    fontSize: fontSize(28),
    fontFamily: fonts.regular,
  },
  scanningDescText: {
    marginTop: wp(2),
    textAlign: 'center',
    fontSize: fontSize(15),
    color: colors.greyText,
    fontFamily: fonts.regular,
  },
  statusBarView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: wp(3),
    paddingHorizontal: wp(5),
    justifyContent: 'space-between',
    backgroundColor: colors.lightGrey,
  },
  stausText: {
    color: colors.black,
    fontSize: fontSize(15),
    fontFamily: fonts.medium,
  },
});
