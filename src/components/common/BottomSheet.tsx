import React from 'react';
import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';

import Modal from 'react-native-modal';

import {wp, colors, hp} from '../../helper';
import {BottomSheetProps} from '../../interface/common';

const BottomSheet = ({
  isVisible,
  closeSheet,
  children,
  handleBar,
  customStyle,
}: BottomSheetProps) => {
  return (
    <Modal
      avoidKeyboard
      style={styles.modal}
      isVisible={isVisible}
      backdropOpacity={0.4}
      // swipeDirection={['down']}
      // onSwipeComplete={closeSheet}
      onBackdropPress={closeSheet}>
      <View style={[styles.bottomSheetView, customStyle]}>
        {handleBar && <View style={styles.handleBar} />}
        {children}
      </View>
    </Modal>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  modal: {
    margin: wp(0),
    justifyContent: 'flex-end',
  },
  bottomSheetView: {
    alignItems: 'center',
    borderTopLeftRadius: wp(4),
    borderTopRightRadius: wp(4),
    backgroundColor: colors.white,
  },
  handleBar: {
    width: wp(24),
    height: wp(1),
    marginTop: hp(1.5),
    borderRadius: wp(100),
    backgroundColor: colors.mediumGrey,
  },
});
