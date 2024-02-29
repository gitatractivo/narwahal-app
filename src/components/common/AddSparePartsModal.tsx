import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {sparePartsList} from '../../helper/dataConstant';
import BottomSheet from './BottomSheet';
import CommonButton from './CommonButton';
import {colors, commonStyles, fontSize, fonts, hp, wp} from '../../helper';

const AddSparePartsModal = ({
  isVisible,
  closeFilter,
  onApplyFilterPress,
}: any) => {
  const [sparePartsData, setSparePartsData] = useState(sparePartsList);

  const renderSparePartsList = ({item}: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          let updatedSparePartsList = sparePartsData.map(obj => {
            if (obj?.id === item?.id) {
              return {...obj, isSelected: !obj?.isSelected};
            } else {
              return obj;
            }
          });
          setSparePartsData(updatedSparePartsList);
        }}
        style={[
          styles.sparePartsListView,
          {
            borderColor: item?.isSelected ? colors.primary : colors.grey,
            backgroundColor: item?.isSelected
              ? colors.primaryxLight
              : colors.white,
          },
        ]}>
        <Text style={styles.sparePartsText}>{item?.name}</Text>
        <Text style={styles.sparePartsText}>{item?.uniqueID}</Text>
      </TouchableOpacity>
    );
  };

  const onClearPress = () => {
    let updatedSparePartsList = sparePartsData.map(obj => {
      return {...obj, isSelected: false};
    });
    setSparePartsData(updatedSparePartsList);
  };

  return (
    <BottomSheet
      handleBar
      customStyle={{flex: 0.6}}
      isVisible={isVisible}
      closeSheet={closeFilter}
      children={
        <View style={[styles.container, {flex: 1}]}>
          <View style={{flex: 1}}>
            <View style={styles.titleView}>
              <Text style={styles.titleText}>{`Add spare part`}</Text>
            </View>

            <View style={styles.subTitleView}>
              <View style={styles.sectionTitleView}>
                <Text style={styles.sectionTitle}>{`Material Desc.`}</Text>
              </View>

              <View style={styles.sectionTitleView}>
                <Text style={styles.sectionTitle}>{`Part No.`}</Text>
              </View>
            </View>

            <View style={styles.listContainer}>
              <FlatList
                data={sparePartsData}
                renderItem={renderSparePartsList}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={commonStyles.contentContainerStyle}
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={onClearPress}
              style={styles.resetBtnView}>
              <Text style={styles.resetBtnText}>{`Clear`}</Text>
            </TouchableOpacity>
            <CommonButton
              title={'Add Part'}
              onPress={() => {
                onClearPress();
                onApplyFilterPress && onApplyFilterPress();
              }}
              additionalBtnStyle={styles.additionalBtnStyle}
            />
          </View>
        </View>
      }
    />
  );
};

export default AddSparePartsModal;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  titleView: {
    paddingLeft: wp(6),
  },
  subTitleView: {
    marginBottom: wp(2),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    color: colors.black,
    fontSize: fontSize(20),
    paddingVertical: wp(6),
    fontFamily: fonts.regular,
  },
  sectionTitleView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: wp(0.5),
    backgroundColor: colors.primaryxLight,
  },
  sectionTitle: {
    paddingLeft: wp(6),
    fontSize: fontSize(15),
    paddingVertical: wp(2),
    color: colors.xxDarkGrey,
    fontFamily: fonts.regular,
  },
  secondaryBtnContainer: {
    paddingLeft: wp(6),
    flexDirection: 'row',
    marginBottom: wp(1.5),
    paddingVertical: hp(2),
  },
  listContainer: {
    marginHorizontal: wp(3),
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
  sparePartsText: {
    color: colors.black,
    fontSize: fontSize(14),
    fontFamily: fonts.regular,
  },
  sparePartsListView: {
    padding: wp(2),
    marginTop: wp(1),
    alignItems: 'center',
    borderWidth: wp(0.2),
    flexDirection: 'row',
    borderRadius: wp(1.6),
    justifyContent: 'space-between',
  },
});
