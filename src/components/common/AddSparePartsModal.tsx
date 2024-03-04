import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

import BottomSheet from './BottomSheet';
import CommonButton from './CommonButton';
import SvgIcons from '../../helper/SvgIcons';
import SecondaryButton from './SecondaryButton';
import {colors, commonStyles, fontSize, fonts, hp, isIos, wp} from '../../helper';

const AddSparePartsModal = ({
  partNo,
  isVisible,
  closeFilter,
  onAddPartPress,
}: any) => {
  const [isReconditioned, setIsReconditioned] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [sparePartName, setSparePartName] = useState(partNo);
  

  return (
    <BottomSheet
      handleBar
      isVisible={isVisible}
      closeSheet={closeFilter}
      children={
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{!partNo?`Add spare part`:'Spare Part'}</Text>
              {!partNo && <TouchableOpacity 
                activeOpacity={0.7} 
                style={styles.scanQrBtn}
                onPress={()=>{}}
              >
                <SvgIcons iconName='scanQR'/>
                <Text style={styles.scanQrText}>{'Scan QR'}</Text>
              </TouchableOpacity>}
            </View>

            <View style={styles.sectionTitleView}>
              <Text style={styles.sectionTitle}>{`Lorem ipsum`}</Text>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputView}>
                <Text style={styles.sparePartsText}>{'Spare Part Name:'}</Text>
                <View style={styles.textInputView}>
                  <TextInput
                    value={sparePartName}
                    onChangeText={(text)=> setSparePartName(text)}
                    style={styles.textInputStyle}  
                    placeholder={'--------------'}
                    placeholderTextColor={colors.black}
                  />
                </View>
              </View>
              <View style={styles.inputView}>
                <Text style={styles.sparePartsText}>{'Tag ID:'}</Text>
                <View style={styles.textInputView}>
                  <TextInput
                    style={styles.textInputStyle}  
                    placeholder='--------------'
                    placeholderTextColor={colors.black}
                  />
                </View>
              </View>
              <View style={styles.inputView}>
                <Text style={styles.sparePartsText}>{'Quantity:'}</Text>
                <View style={styles.textInputView}>
                  <TextInput
                    style={styles.textInputStyle}  
                    placeholder='--------------'
                    placeholderTextColor={colors.black}
                  />
                </View>
              </View>
            </View>

            <View style={styles.sectionTitleView}>
              <Text style={styles.sectionTitle}>{`Condition`}</Text>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.seconndoryBtnContainer}>
                <Text style={styles.sparePartsText}>{'Spare Part Conditon:'}</Text>
                <View style={commonStyles.flexRow}>
                  <SecondaryButton 
                    title={'Reconditioned'}
                    isSelected={isReconditioned} 
                    onPress={()=>{setIsReconditioned(!isReconditioned); setIsNew(false);}} 
                  />
                  <View style={{width: wp(3)}}/>
                  <SecondaryButton 
                    title={'New'}
                    isSelected={isNew} 
                    onPress={()=>{setIsReconditioned(false); setIsNew(!isNew);}} 
                  />
                </View>
              </View>
            </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={()=>{}}
              style={styles.resetBtnView}>
              <Text style={styles.resetBtnText}>{`Clear`}</Text>
            </TouchableOpacity>
            <CommonButton
              title={'Add Part'}
              onPress={() => {
                onAddPartPress && onAddPartPress();
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
  titleText: {
    color: colors.black,
    fontSize: fontSize(20),
    paddingVertical: wp(6),
    fontFamily: fonts.regular,
  },
  sectionTitleView: {
    paddingLeft: wp(6),
    paddingVertical: wp(2),
    backgroundColor: colors.primaryxLight,
  },
  sectionTitle: {
    color: colors.black,
    fontSize: fontSize(15),
    fontFamily: fonts.regular,
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
    flex:1,
    color: colors.black,
    fontSize: fontSize(14),
    fontFamily: fonts.regular,
  },
  inputContainer: {
    padding: wp(3),
  },
  seconndoryBtnContainer:{
    paddingHorizontal: wp(3),
    paddingVertical: wp(1),
    alignItems:'center', 
    flexDirection:'row', 
    borderWidth: wp(0.2), 
    borderRadius: wp(1.6), 
    marginVertical: hp(0.5),
    borderColor: colors.grey, 
    justifyContent:'space-between',
  },
  inputView: {
    padding: wp(3),
    alignItems:'center', 
    flexDirection:'row', 
    borderWidth: wp(0.2), 
    borderRadius: wp(1.6), 
    marginVertical: hp(0.5),
    borderColor: colors.grey, 
    justifyContent:'space-between', 
  },
  textInputView: {
    flex: 1,
  },
  textInputStyle: {
    maxWidth: wp(35),
    color: colors.black, 
    fontSize: fontSize(13), 
    fontFamily: fonts.regular, 
    borderBottomWidth: wp(0.1),
    paddingVertical: isIos ? wp(2) : 0,
    borderBottomColor: colors.darkGrey,
  },
  scanQrText: {
    color: colors.white, 
    marginLeft: wp(2.5), 
    fontSize: fontSize(12), 
    fontFamily: fonts.medium
  },
  scanQrBtn: {
    padding: wp(3),
    alignItems:'center',
    flexDirection:'row',
    borderRadius: wp(100),
    backgroundColor: colors.primary, 
  },
  titleContainer: {
    alignItems:'center',
    flexDirection: 'row',
    paddingHorizontal: wp(6),
    justifyContent:'space-between', 
  }
});
