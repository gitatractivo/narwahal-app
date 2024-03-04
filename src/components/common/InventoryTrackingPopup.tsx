import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import SvgIcons from '../../helper/SvgIcons'
import CommonButton from './CommonButton'
import BottomSheet from './BottomSheet'
import LinearGradient from 'react-native-linear-gradient'
import { colors, commonStyles, fontSize, fonts, hp, isIos, wp } from '../../helper'

const InventoryTrackingPopup = ({isVisible, closeSheet, onSavePress}: any) => {
  return (
    <BottomSheet
        isVisible={isVisible}
        closeSheet={closeSheet}
        children={
          <>
            <View style={styles.modalTitleView}>
              <View style={commonStyles.flexRow}>
                <SvgIcons iconName="target" />
                <Text style={styles.modalTitleText}>{`Tracking`}</Text>
              </View>
              <View style={styles.gradientContainer}>
                <LinearGradient
                  colors={['#F9A9A7', '#C4BDA5', '#92D0A2']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.linearGradientView}
                />
              </View>
            </View>
            <View style={styles.modalSubTitleView}>
              <SvgIcons iconName="pencil" />
              <Text style={styles.subTitleText}>{`Edit`}</Text>
            </View>
            <View style={styles.modalInputView}>
              <Text style={styles.modalLabelText}>{`Scanned Qty:`}</Text>
              <View style={styles.modalInputContainer}>
                <TextInput
                  style={styles.modalInputStyle}
                  keyboardType="numeric"
                />
              </View>
            </View>
            
            <View style={styles.modalButtonContainer}>
              <CommonButton
                title={'Save'}
                onPress={() => {onSavePress && onSavePress(); closeSheet && closeSheet()}}
              />
            </View>
          </>
        }
      />
  )
}

export default InventoryTrackingPopup

const styles = StyleSheet.create({
    modalTitleView: {
        width: '100%',
        paddingTop: wp(7),
        paddingLeft: wp(7),
        paddingBottom: wp(7),
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'flex-start',
        borderBottomWidth: wp(0.2),
        borderBlockColor: colors.grey,
        justifyContent: 'space-between',
      },
      modalTitleText: {
        marginLeft: wp(3),
        color: colors.black,
        fontSize: fontSize(18),
        fontFamily: fonts.medium,
      },
      modalSubTitleView: {
        width: '100%',
        padding: wp(7),
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
      },
      subTitleText: {
        marginLeft: wp(3),
        color: colors.black,
        fontSize: fontSize(18),
        fontFamily: fonts.medium,
      },
      modalInputView: {
        width: '72%',
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: hp(1),
        justifyContent: 'space-between',
      },
      modalLabelText: {
        color: colors.darkGrey,
        fontSize: fontSize(16),
        fontFamily: fonts.regular,
      },
      modalInputContainer: {
        width: '55%',
        borderBottomWidth: wp(0.2),
        borderBlockColor: colors.grey,
        paddingVertical: isIos ? hp(1) : 0,
      },
      modalInputStyle: {
        color: colors.black,
        fontSize: fontSize(15),
        fontFamily: fonts.regular,
      },
      modalButtonContainer: {
        marginVertical: hp(4.5),
      },
      gradientContainer: {
        paddingRight: wp(4)
      },
      linearGradientView: {
        width: wp(54),
        height: hp(1.5),
        borderRadius: wp(100),
      }
})