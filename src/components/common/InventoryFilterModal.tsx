import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {
  roomNamesButtons,
  inventoryTypeButtons,
} from '../../helper/dataConstant';
import BottomSheet from './BottomSheet';
import RadioButton from './RadioButton';
import CommonButton from './CommonButton';
import SecondaryButton from './SecondaryButton';
import {colors, fontSize, fonts, hp, wp} from '../../helper';

const InventoryFilterModal = ({
  isVisible,
  closeFilter,
  onResetPress,
  onApplyFilterPress,
}: any) => {
  const [inventoryTypes, setInventoryTypes] = useState(inventoryTypeButtons);
  const [roomNames, setRoomNames] = useState(roomNamesButtons);
  return (
    <BottomSheet
      handleBar
      isVisible={isVisible}
      closeSheet={closeFilter}
      children={
        <View style={styles.container}>
          <View style={styles.titleView}>
            <Text style={styles.titleText}>{`Filters`}</Text>
          </View>
          <View style={styles.sectionTitleView}>
            <Text style={styles.sectionTitle}>{`Inventory Type`}</Text>
          </View>

          <View style={styles.secondaryBtnContainer}>
            {inventoryTypes?.map((obj, index) => {
              return (
                <SecondaryButton
                  isSelected={obj?.isSelected}
                  title={obj?.title}
                  customBtnStyle={{marginLeft: index != 0 ? wp(4) : 0}}
                  onPress={() => {
                    let updatedInventoryTypes = inventoryTypes.map(item => {
                      if (item?.id === obj?.id) {
                        return {...item, isSelected: !item?.isSelected};
                      } else {
                        return {...item, isSelected: false};
                      }
                    });
                    setInventoryTypes(updatedInventoryTypes);
                  }}
                />
              );
            })}
          </View>

          <View style={styles.sectionTitleView}>
            <Text style={styles.sectionTitle}>{`Room Names`}</Text>
          </View>

          <View style={styles.radioBtnContainer}>
            {roomNames?.map(obj => {
              return (
                <RadioButton
                  isSelected={obj?.isSelected}
                  title={obj?.title}
                  onPress={() => {
                    let updatedRoomNames = roomNames.map(item => {
                      if (item?.id === obj?.id) {
                        return {...item, isSelected: !item?.isSelected};
                      } else {
                        return item;
                      }
                    });
                    setRoomNames(updatedRoomNames);
                  }}
                />
              );
            })}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={onResetPress}
              style={styles.resetBtnView}>
              <Text style={styles.resetBtnText}>{`Reset`}</Text>
            </TouchableOpacity>
            <CommonButton
              title={'Apply Filters'}
              onPress={onApplyFilterPress}
              additionalBtnStyle={styles.additionalBtnStyle}
            />
          </View>
        </View>
      }
    />
  );
};

export default InventoryFilterModal;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  titleView: {
    paddingLeft: wp(6),
  },
  titleText: {
    paddingVertical: wp(6),
    fontFamily: fonts.regular,
    fontSize: fontSize(20),
    color: colors.black,
  },
  sectionTitleView: {
    backgroundColor: colors.primaryxLight,
  },
  sectionTitle: {
    paddingLeft: wp(6),
    paddingVertical: wp(2),
    fontFamily: fonts.regular,
    fontSize: fontSize(12),
    color: colors.black,
  },
  secondaryBtnContainer: {
    flexDirection: 'row',
    paddingVertical: hp(2),
    paddingLeft: wp(6),
    marginBottom: wp(1.5),
  },
  radioBtnContainer: {
    marginHorizontal: wp(6),
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(3),
    paddingHorizontal: wp(6),
    backgroundColor: colors.white,
    justifyContent: 'space-between',
  },
  additionalBtnStyle: {
    width: wp(50),
  },
  resetBtnView: {
    width: wp(30),
    alignSelf: 'center',
    justifyContent: 'center',
  },
  resetBtnText: {
    padding: wp(2),
    color: colors.black,
    textAlign: 'center',
    fontSize: fontSize(18),
    fontFamily: fonts.medium,
  },
});
