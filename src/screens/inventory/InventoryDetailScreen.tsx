import React, {useCallback, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

import SvgIcons from '../../helper/SvgIcons';
import {
  inventoryAddList,
  inventoryDetailList,
  inventoryScanList,
} from '../../helper/dataConstant';
import {
  AddSparePartsModal,
  AnimatedFAB,
  BottomSheet,
  FAB,
  InventoryAddListItem,
  InventoryDetailListItem,
} from '../../components';
import {colors, commonStyles, fontSize, fonts, wp} from '../../helper';

const InventoryDetailScreen = ({route}: any) => {
  const title = route?.params?.title;

  const [isScanning, setIsScanning] = useState(false);
  const [isAddListVisible, setIsAddListVisible] = useState(false);
  const [isScanListVisible, setIsScanListVisible] = useState(false);
  const [isAddPartsModal, setIsAddPartsModal] = useState(false);

  const onScanPress = useCallback(() => {
    setIsScanning(true);
    setIsScanListVisible(true);
    setIsAddListVisible(false);
    setTimeout(() => {
      setIsScanning(false);
    }, 3000);
  }, [isScanning]);

  const onAddPress = useCallback(() => {
    setIsAddListVisible(true);
    setIsScanListVisible(false);
  }, []);

  const renderScanList = ({item}: any) => {
    return (
      <InventoryDetailListItem isTagVisible item={item} onPress={() => {}} />
    );
  };
  const renderAddList = ({item}: any) => {
    return (
      <InventoryAddListItem
        item={item}
        onPress={() => setIsAddPartsModal(true)}
      />
    );
  };
  const renderDetail = ({item}: any) => {
    return <InventoryDetailListItem item={item} onPress={() => {}} />;
  };

  return (
    <View style={commonStyles.root}>
      {isScanning ? (
        <View style={[styles.scanningFileContainer, {flex: 1000}]}>
          <SvgIcons iconName={'scanningFiles'} />
          <Text style={styles.scanningText}>{'Scanning...'}</Text>
          <Text style={styles.scanningDescText}>
            {
              'Lorem ipsum is the placeholder text he\nplaceholder text older text.'
            }
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.titleView}>
            <Text numberOfLines={1} style={styles.titleText}>
              {title}
            </Text>
            <Text numberOfLines={1} style={styles.descText}>
              {`Lorem ipsum line`}
            </Text>
          </View>

          {isScanListVisible ? (
            <FlatList
              bounces={false}
              data={inventoryScanList}
              renderItem={renderScanList}
              keyExtractor={item => item?.id?.toString()}
              contentContainerStyle={commonStyles.contentContainerStyle}
            />
          ) : isAddListVisible ? (
            <FlatList
              bounces={false}
              data={inventoryAddList}
              renderItem={renderAddList}
              keyExtractor={item => item?.id?.toString()}
              contentContainerStyle={commonStyles.contentContainerStyle}
            />
          ) : (
            <FlatList
              bounces={false}
              data={inventoryDetailList}
              renderItem={renderDetail}
              keyExtractor={item => item?.id?.toString()}
              contentContainerStyle={commonStyles.contentContainerStyle}
            />
          )}
        </>
      )}

      {isAddListVisible ? (
        <FAB
          status={'Save'}
          onPress={() => {
            setIsAddListVisible(false);
            setIsScanListVisible(false);
          }}
        />
      ) : (
        <AnimatedFAB
          onAddPress={onAddPress}
          onScanPress={onScanPress}
          isScanPressed={isScanning}
        />
      )}

      <AddSparePartsModal
        isVisible={isAddPartsModal}
        closeFilter={() => setIsAddPartsModal(false)}
        onApplyFilterPress={() => setIsAddPartsModal(false)}
      />
    </View>
  );
};

export default InventoryDetailScreen;

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
});
