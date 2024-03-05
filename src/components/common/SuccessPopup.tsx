import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Modal from 'react-native-modal';

import {wp, colors, fontSize, fonts, hp} from '../../helper';
import SvgIcons from '../../helper/SvgIcons';

const CommonModal = ({
  isVisible,
  titleText,
  descText,
  btnTitle,
  onPress,
}: any) => {
  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.5}
      style={styles.modalStyle}>
      <View style={styles.modalView}>
        <View style={styles.checkMarkView}>
            <View style={styles.checkSubMarkView}>
                <SvgIcons iconName={'checkMarkBlue'}/>
            </View>
        </View>

        <Text style={styles.titleText}>{titleText || 'Successfully Updated!'}</Text>
        <Text style={styles.descText}>{descText || 'Checkout Completed.'}</Text>

        <TouchableOpacity style={styles.btnView} onPress={onPress}>
            <Text style={styles.btnTitle}>{btnTitle || 'Close'}</Text>
        </TouchableOpacity>
        
      </View>
    </Modal>
  );
};

export default CommonModal;

const styles = StyleSheet.create({
  modalStyle:{
    alignItems: 'center',
  },
  modalView: {
    padding: hp(4),
    alignItems: 'center',
    borderRadius: wp(5.5),
    backgroundColor: colors.white,
  },
  checkMarkView:{
    width: wp(30), 
    height:wp(30), 
    alignItems:'center', 
    borderRadius: wp(100), 
    justifyContent:'center',
    backgroundColor: colors.primaryxLight, 
  },
  checkSubMarkView:{
    width: wp(26), 
    height:wp(26), 
    alignItems:'center', 
    borderRadius: wp(100), 
    justifyContent:'center',
    backgroundColor: colors.primaryMedium, 
  },
  titleText:{
    marginTop: hp(3),
    color: colors.primary,
    fontSize: fontSize(18),
    fontFamily: fonts.bold,
  },
  descText: {
    marginTop: hp(1),
    color: colors.darkGrey,
    fontSize: fontSize(14),
    fontFamily: fonts.regular,
  },
  btnView:{
    width: wp(30),
    height: hp(4.5),
    marginTop: hp(3),
    alignItems:'center',
    borderRadius: wp(2.66),
    justifyContent: 'center',
    backgroundColor: colors.primaryxLight,
  },
  btnTitle: {
    color: colors.primary,
    fontSize: fontSize(14),
    fontFamily: fonts.medium,
  },
});
