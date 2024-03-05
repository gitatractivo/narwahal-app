import React, {useCallback, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

import SvgIcons from '../../helper/SvgIcons';
import {
  inventoryAddList,
  inventoryDetailList,
} from '../../helper/dataConstant';
import {
  AddSparePartsModal,
  AnimatedFAB,
  FAB,
  InventoryAddListItem,
  InventoryDetailListItem,
  TrackingPopup,
} from '../../components';
import {ListFooterComponent, colors, commonStyles, fontSize, fonts,  wp} from '../../helper';

const InventoryDetailScreen = ({route}: any) => {
  const title = route?.params?.title;

  const [isScanning, setIsScanning] = useState(false);
  const [isScanFirst, setIsScanFirst] = useState(false);
  const [isAddListVisible, setIsAddListVisible] = useState(false);
  const [isAddPartsModal, setIsAddPartsModal] = useState(false);
  const [isTrackingPopup, setIsTrackingPopup] = useState(false);
  const [partNo, setPartNo] = useState('');

  const onScanPress = useCallback(() => {
    setIsScanning(true);
    setIsAddListVisible(false);
    setTimeout(() => {
      setIsScanning(false);
    }, 3000);
    setIsScanFirst(true);
  }, [isScanning]);

  const onAddPress = useCallback(() => {
    setIsAddListVisible(true);
  }, []);

  const renderAddList = ({item}: any) => {
    return (
      <InventoryAddListItem
        item={item}
        onPress={() => {
          setPartNo(item?.uniqueID); 
          setTimeout(() => {
            setIsAddPartsModal(true); 
          }, 500);
        }}
      />
    );
  };
  const renderDetail = ({item}: any) => {
    return <InventoryDetailListItem 
            item={item} 
            onPress={() => {}} 
            onSubListPress={() => {setIsTrackingPopup(true)}}
          />;
  };

  return (
    <View style={commonStyles.root}>
          <View style={styles.titleView}>
            <Text numberOfLines={1} style={styles.titleText}>
              {title}
            </Text>
            <Text numberOfLines={1} style={styles.descText}>
              {`Lorem ipsum line`}
            </Text>
          </View>

          {isScanning && 
            <TouchableOpacity activeOpacity={0.8} onPress={()=>{}} style={styles.triggerView}>
              <SvgIcons iconName='barcodeReader'/>
              <Text style={styles.triggerText}>{'Press the trigger to start scanning!'}</Text>
            </TouchableOpacity>}

          {isAddListVisible ? (
            <FlatList
              bounces={false}
              data={inventoryAddList}
              renderItem={renderAddList}
              keyExtractor={item => item?.id?.toString()}
              ListFooterComponent={ListFooterComponent}
            />
          ) : (
            <FlatList
              bounces={false}
              data={inventoryDetailList}
              renderItem={renderDetail}
              keyExtractor={item => item?.id?.toString()}
              ListFooterComponent={ListFooterComponent}
            />
          )}

      {isAddListVisible ? (
        <FAB
          status={'Add'}
          iconName={'plus'}
          onPress={() => {
            setIsAddPartsModal(true);
            // setIsAddListVisible(false);
            // setIsScanListVisible(false);
          }}
        />
      ) : (
        <AnimatedFAB
          onAddPress={onAddPress}
          onScanPress={onScanPress}
          isScanFirst={isScanFirst}
          isScanPressed={isScanning}
          onClosePress={() => setIsScanFirst(false)}
        />
      )}

      <AddSparePartsModal
        partNo={partNo}
        isVisible={isAddPartsModal}
        closeFilter={() => {setIsAddPartsModal(false); setPartNo('')}}
        onAddPartPress={() => {setIsAddPartsModal(false); setIsAddListVisible(false); setPartNo('') }}
      />

      <TrackingPopup 
        locationNotVisible
        isVisible={isTrackingPopup}
        closeSheet={() => setIsTrackingPopup(false)}
        onSavePress={() => {}}
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
  triggerView: {
    margin: wp(1), 
    borderWidth: wp(0.2),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: wp(1.6),
    justifyContent: 'center',
    paddingVertical: wp(1.5),
    borderColor: colors.primary,
    backgroundColor: colors.primaryMedium,
  },
  triggerText: {
    marginLeft: wp(3),
    color: colors.primary,
    fontSize: fontSize(14),
    fontFamily: fonts.medium,
  },
});
