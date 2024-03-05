import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { DetailListItemProps } from '../../interface/common';
import { colors, commonStyles, fontSize, fonts, hp, icons, wp } from '../../helper';
import Animated, { measure, runOnUI, useAnimatedRef, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import { PMSsubListItem } from '../../helper/dataConstant';
import SvgIcons from '../../helper/SvgIcons';
import Shadow from './Shadow';

const PMSDetailListItem = ({ item, onSubListPress }: any) => {
  const [PMSsubListData, setPMSsubListData] = useState(PMSsubListItem)

  const listRef = useAnimatedRef();
  const open = useSharedValue(false);
  const heightValue = useSharedValue(0);

  const progress = useDerivedValue(() =>
    open.value ? withTiming(1) : withTiming(0),
  );

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{rotate: `${progress.value * -180}deg`}],
  }));

  const heightAnimationStyle = useAnimatedStyle(() => ({
    height: heightValue.value,
  }));

  const marginAnimation = useAnimatedStyle(() => ({
    marginTop: open.value ? withTiming(0) : withTiming(30),
  }));

  const onContentPress = () => {
    if (heightValue.value === 0) {
      runOnUI(() => {
        'worklet';
        heightValue.value = withTiming(measure(listRef)!.height);
      })();
    } else {
      heightValue.value = withTiming(0);
    }
    open.value = !open.value;
  };

  const onLongSubListPress = (item :any) => {
    let updatedSubList = PMSsubListData?.map((obj)=>{
      if(item?.id === obj?.id) {
        return {...obj, isSelected: !obj?.isSelected}
      } else {
        return obj
      }
    })
    setPMSsubListData(updatedSubList)
  }  

  return (
      <Pressable
          onPress={onContentPress}
          style={styles.container}>
        <Text style={styles.titleText}>{item?.title}</Text>
        <View style={styles.tagContainer}>
          <Text style={styles.idText}>{item?.uniqueID}</Text>
          <Animated.View style={[{marginRight: wp(0.5)},iconStyle]}>
            <Image source={icons.chevronDown} style={styles.downArrowStyle} />
          </Animated.View>
        </View>

        <View style={styles.qtyContainer}>
          <View>
            <Text style={[styles.uniqText, styles.marginTop]}>ROB:</Text>
            <Text style={[styles.uniqText, styles.marginTop]}>Scanned Qty:</Text>
          </View>
          <View>
            <Text style={[styles.qtyText, styles.marginTop]}>{item?.rob}</Text>
            <Text style={[styles.qtyText, styles.marginTop]}>{item?.scannedQty}</Text>
          </View>
          <View style={styles.qtySubView}>
            <Text style={[styles.uniqText, styles.marginTop]}>Working & Replace:</Text>
            <Text style={[styles.uniqText, styles.marginTop]}>Checkout Qty:</Text>
          </View>
          <View>
            <Text style={[styles.qtyText, styles.marginTop]}>{item?.workingReplace}</Text>
          <Text style={[styles.qtyText, styles.marginTop]}>{item?.checkoutQty}</Text>
          </View>
        </View>
        <View style={[styles.greenDot, {backgroundColor: false ? colors.redAlert : colors.green }]} />

        <Animated.View style={heightAnimationStyle}>
          <Animated.View style={[styles.contentContainer, marginAnimation]} ref={listRef}>
            {PMSsubListData.map((item)=>{
              return(
                <Shadow shadowStyle={styles.shadowStyle}>
                <TouchableOpacity
                  style={[styles.packetsContainer,
                          {
                            borderColor: item?.isSelected ? colors.green : colors.white,
                            backgroundColor: item?.isSelected ? colors.greenxxLight : colors.white,
                          }]}
                  activeOpacity={0.7}
                  onPress={onSubListPress}
                  onLongPress={()=>onLongSubListPress(item)}
                >
                  <View style={commonStyles.flexRow}>
                    <Text style={[styles.uniqText, styles.marginLeft, {color: item?.isSelected ? colors.green : colors.darkGrey}]}>
                      {`ID:`}
                    </Text>
                    <Text style={[styles.srNoText,{color: item?.isSelected ? colors.green : colors.black}]}>
                      {`${item?.ID}`}
                    </Text>
                    <Text style={[styles.uniqText, styles.marginLeft, {color: item?.isSelected ? colors.green : colors.darkGrey}]}>
                      {`Scanned Qty:`}
                    </Text>
                    <Text style={[styles.qtyText , {color: item?.isSelected ? colors.green : colors.black}]}>
                      {item?.scannedQty}
                    </Text>
                  </View>
                  <View style={commonStyles.flexRow}>
                    <View
                      style={[
                        styles.tagView,
                        {
                          backgroundColor:
                            (item?.tag == 'Reconditioned' || item?.tag == 'Missing')
                              ? colors.orangexLight
                              : colors.greenxLight,
                          borderColor:
                            (item?.tag == 'Reconditioned' || item?.tag == 'Missing')
                              ? colors.orangeLight
                              : colors.greenLight,
                        },
                      ]}>
                      <Text
                        style={[
                          styles.tagText,
                          {
                            color: 
                              (item?.tag == 'Reconditioned' || item?.tag == 'Missing')
                                ? colors.orange : colors.green,
                          },
                        ]}>
                        {item?.tag}
                      </Text>
                    </View>
                    <SvgIcons iconName={'chevronRightLite'}/>
                  </View>
                </TouchableOpacity>
                </Shadow>
              )
            })}
          </Animated.View>
        </Animated.View>
      </Pressable>
  );
};

export default PMSDetailListItem;

const styles = StyleSheet.create({
  container: {
    padding: wp(5.5),
    borderBottomWidth: wp(0.2),
    backgroundColor: colors.white,
    borderBottomColor: colors.grey,
  },
  titleText: {
    color: colors.black,
    fontSize: fontSize(15),
    fontFamily: fonts.medium,
  },
  tagContainer: {
    marginTop: wp(1.5),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  tagView: {
    marginRight: wp(3),
    borderWidth: wp(0.2),
    paddingVertical: wp(1),
    borderRadius: wp(1.33),
    paddingHorizontal: wp(3),
    borderColor: colors.orangeLight,
    backgroundColor: colors.orangexLight,
  },
  tagText: {
    color: colors.orange,
    fontSize: fontSize(12),
    fontFamily: fonts.medium,
  },
  qtyContainer: {
    marginTop: hp(3),
    alignItems: 'center',
    flexDirection: 'row',
  },
  qtySubView: {
    marginLeft: wp(8),
  },
  uniqText: {
    marginRight: wp(3),
    color: colors.darkGrey,
    fontSize: fontSize(13),
    fontFamily: fonts.regular,
  },
  idText: {
    color: colors.darkGrey,
    fontSize: fontSize(13),
    fontFamily: fonts.regular,
  },
  qtyText: {
    color: colors.black,
    fontSize: fontSize(15),
    fontFamily: fonts.medium,
  },
  greenDot: {
    top: wp(3),
    width: wp(3),
    right: wp(3),
    height: wp(3),
    position: 'absolute',
    borderRadius: wp(100),
  },
  downArrowStyle:{
    width: wp(3),
    height: wp(2),
    resizeMode:'contain',
    tintColor: colors.greyText,
  },
  packetsContainer: {
    padding: wp(2),
    marginTop: hp(1),
    alignItems:'center', 
    flexDirection:'row', 
    borderRadius: wp(1.6), 
    justifyContent:'space-between', 
    backgroundColor: colors.white,
    borderWidth: wp(0.2),
  },
  contentContainer: {
    width: '100%',
    position: 'absolute',
  },
  srNoText: {
    width: wp(7),
    color: colors.black,
    fontSize: fontSize(15),
    fontFamily: fonts.medium,
  },
  marginLeft: {
    marginLeft: wp(2),
  },
  marginTop: {
    marginTop: wp(2),
  },
  shadowStyle:{
      shadowOffset: {
        width:0,
        height: 0,
      },
      shadowRadius: 3,
      shadowOpacity: 0.1,
      shadowColor: colors.dropShadow,
  }
});