import React from 'react';
import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';

import Modal from 'react-native-modal';

import {wp, colors} from '../../helper';
import {BottomSheetProps} from '../../interface/common';

const BottomSheet = ({isVisible, closeSheet, sheetBody}: BottomSheetProps) => {
  return (
    <Modal
      avoidKeyboard
      style={styles.modal}
      isVisible={isVisible}
      backdropOpacity={0.4}
      swipeDirection={['down']}
      onSwipeComplete={closeSheet}
      onBackdropPress={closeSheet}>
      <View style={styles.bottomSheetView}>{sheetBody}</View>
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
});
