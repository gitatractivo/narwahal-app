import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import SvgIcons from '../../helper/SvgIcons';
import {inventorySecondFloorList} from '../../helper/dataConstant';
import {ListFooterComponent, colors, commonStyles, fontSize, fonts, hp, wp} from '../../helper';
import {InventoryFilterModal, InventorySecondListItem} from '../../components';

export function AllInventoryScreen({navigation}: any) {
  const [filterModal, setFilterModal] = useState<boolean>(false);
  const renderInventorySecondFloorList = ({item}: any) => {
    return (
      <InventorySecondListItem
        item={item}
        onPress={() =>
          navigation.navigate('InventorySubListScreen', {
            title: item?.title,
          })
        }
      />
    );
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
        data={inventorySecondFloorList}
        renderItem={renderInventorySecondFloorList}
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
}

export function SecondFloor({navigation}: any) {
  const [filterModal, setFilterModal] = useState<boolean>(false);
  const renderInventorySecondFloorList = ({item}: any) => {
    return (
      <InventorySecondListItem
        item={item}
        onPress={() =>
          navigation.navigate('InventorySubListScreen', {
            title: item?.title,
          })
        }
      />
    );
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
        data={inventorySecondFloorList}
        renderItem={renderInventorySecondFloorList}
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
}

export function ThirdFloor({navigation}: any) {
  const [filterModal, setFilterModal] = useState<boolean>(false);
  const renderInventorySecondFloorList = ({item}: any) => {
    return (
      <InventorySecondListItem
        item={item}
        onPress={() =>
          navigation.navigate('InventorySubListScreen', {
            title: item?.title,
          })
        }
      />
    );
  };

  return (
    <View style={commonStyles.root}>
      <TouchableOpacity
        onPress={() => setFilterModal(true)}
        activeOpacity={0.7}
        style={styles.statusBarView}>
        <Text style={styles.stausText}>{`Inventory type`}</Text>
        <SvgIcons iconName="chevronRight" />
      </TouchableOpacity>

      <FlatList
        bounces={false}
        data={inventorySecondFloorList}
        renderItem={renderInventorySecondFloorList}
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
}

export function BosunStore({navigation}: any) {
  const [filterModal, setFilterModal] = useState<boolean>(false);
  const renderInventorySecondFloorList = ({item}: any) => {
    return (
      <InventorySecondListItem
        item={item}
        onPress={() =>
          navigation.navigate('InventorySubListScreen', {
            title: item?.title,
          })
        }
      />
    );
  };

  return (
    <View style={commonStyles.root}>
      <TouchableOpacity
        onPress={() => setFilterModal(true)}
        activeOpacity={0.7}
        style={styles.statusBarView}>
        <Text style={styles.stausText}>{`Inventory type`}</Text>
        <SvgIcons iconName="chevronRight" />
      </TouchableOpacity>

      <FlatList
        bounces={false}
        data={inventorySecondFloorList}
        renderItem={renderInventorySecondFloorList}
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
}

const styles = StyleSheet.create({
  statusBarView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: wp(3),
    paddingHorizontal: wp(5),
    justifyContent: 'space-between',
    backgroundColor: colors.lightGrey,
  },
  flexRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  dailyText: {
    marginRight: wp(1),
    color: colors.black,
    fontSize: fontSize(13),
    fontFamily: fonts.medium,
  },
  stausText: {
    color: colors.black,
    fontSize: fontSize(15),
    fontFamily: fonts.medium,
  },
  completedText: {
    marginRight: wp(2),
    color: colors.green,
    fontSize: fontSize(11),
    fontFamily: fonts.medium,
  },
  modalButtonContainer: {
    marginVertical: hp(4.5),
    marginHorizontal: wp(6),
  },
});
