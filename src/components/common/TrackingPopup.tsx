import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import SvgIcons from '../../helper/SvgIcons'
import CommonButton from './CommonButton'
import BottomSheet from './BottomSheet'
import LinearGradient from 'react-native-linear-gradient'
import { colors, commonStyles, fontSize, fonts, hp, isIos, wp } from '../../helper'

const TrackingPopup = ({isVisible, closeSheet, onSavePress, selectProduct, checkIn, pms, hideLocation}: any) => {
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

            {!hideLocation && <View style={styles.loacationTitleView}>
              <View style={commonStyles.flexRow}>
                <SvgIcons iconName="location" />
                <Text style={styles.subTitleText}>{`Location`}</Text>
              </View>
              <View style={styles.qtyContainer}>
                <Text style={styles.uniqText}>{`Floor:`}</Text>
                <Text style={styles.qtyText}>{'0'}</Text>
                <Text
                  style={[styles.uniqText, styles.marginLeft]}>{`Room:`}</Text>
                <Text style={styles.qtyText}>{`Inventory Room`}</Text>
                <Text
                  style={[styles.uniqText, styles.marginLeft]}>{`Rack:`}</Text>
                <Text style={styles.qtyText}>{'03'}</Text>
              </View>
            </View>}

            <View style={styles.modalSubTitleView}>
              <SvgIcons iconName="pencil" />
              <Text style={styles.subTitleText}>{`Edit`}</Text>
            </View>

            {(checkIn || pms) && <View style={styles.modalInputView}>
              <Text style={styles.modalLabelText}>{`Scanned Qty:`}</Text>
              <View style={styles.modalInputContainer}>
                <TextInput
                  style={styles.modalInputStyle}
                  keyboardType="numeric"
                />
              </View>
            </View>}

            <View style={styles.modalInputView}>
              <Text style={styles.modalLabelText}>{hideLocation ? `Scanned Qty:` : checkIn ? `Check-In Qty:` : `Check-out Qty:`}</Text>
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

export default TrackingPopup

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
        borderBottomColor: colors.grey,
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
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: hp(2),
        alignSelf: 'flex-start',
        paddingHorizontal: wp(7),
      },
      loacationTitleView: {
        paddingHorizontal: wp(7),
        paddingVertical: hp(2),
        borderBottomWidth: wp(0.2),
        borderBottomColor: colors.grey,
      },
      subTitleText: {
        marginLeft: wp(3),
        color: colors.black,
        fontSize: fontSize(18),
        fontFamily: fonts.medium,
      },
      modalInputView: {
        width: '80%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: wp(1)
      },
      modalLabelText: {
        color: colors.darkGrey,
        fontSize: fontSize(16),
        fontFamily: fonts.regular,
      },
      modalInputContainer: {
        width: '55%',
        borderBottomWidth: wp(0.2),
        borderBottomColor: colors.grey,
        paddingVertical: isIos ? hp(1) : 0,
      },
      modalInputStyle: {
        paddingVertical: 0,
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
      },
      qtyContainer: {
        width:'100%',
        paddingTop: hp(2),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent:'center',
      },
      uniqText: {
        marginRight: wp(3),
        color: colors.darkGrey,
        fontSize: fontSize(13),
        fontFamily: fonts.regular,
      },
      qtyText: {
        color: colors.black,
        fontSize: fontSize(15),
        fontFamily: fonts.medium,
      },
      marginLeft: {
        marginLeft: wp(3),
      },
})