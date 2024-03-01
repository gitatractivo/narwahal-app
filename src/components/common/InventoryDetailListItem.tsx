import React, { useState } from 'react';
import {Image, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {colors, commonStyles, fontSize, fonts, hp, icons, wp} from '../../helper';
import { subListItem } from '../../helper/dataConstant';
import Animated, { measure, runOnUI, useAnimatedRef, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';

const InventoryDetailListItem = ({item, onPress, onSubListPress}: any) => {
  const [isPacketsVisible, setIsPacketsVisible] = useState(false);

  const onItemPress = () =>{
    onPress && onPress();
    setIsPacketsVisible(!isPacketsVisible);
  }

  //List Animation
  const listRef = useAnimatedRef();
  const open = useSharedValue(isPacketsVisible);
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
  const tagViewAnimation = useAnimatedStyle(() => ({
    opacity: open.value ? withTiming(0) : withTiming(1),
  }));
  const qtyViewAnimation = useAnimatedStyle(() => ({
    opacity: open.value ? withTiming(0) : withTiming(1),
    height: open.value ? withTiming(0) : withTiming(20),
  }));
  const marginAnimation = useAnimatedStyle(() => ({
    marginTop: open.value ? withTiming(0) : withTiming(50),
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
  
  return (
    <Pressable
      onPress={()=>{onContentPress();  onItemPress && onItemPress()}}
      style={styles.container}>
      <Text style={styles.titleText}>{item?.title}</Text>
      <View style={styles.tagContainer}>
        <View style={styles.tagSubContainer}>
          <Text style={styles.uniqText}>{item?.uniqueID}</Text>
          <Animated.View
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
              tagViewAnimation
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
          </Animated.View>
        </View>
          <Animated.View style={iconStyle}>
            <Image source={icons.chevronDown} style={styles.downArrowStyle} />
          </Animated.View>
      </View>

        <Animated.View style={[styles.qtyContainer,qtyViewAnimation ]}>
          <Text style={styles.uniqText}>{`ROB:`}</Text>
          <Text style={styles.qtyText}>{item?.rob}</Text>
          <Text
            style={[styles.uniqText, styles.marginLeft]}>{`Scanned Qty:`}</Text>
          <Text style={styles.qtyText}>{item?.scannedQty}</Text>
        </Animated.View>

        <Animated.View style={heightAnimationStyle}>
          <Animated.View style={[styles.contentContainer, marginAnimation]} ref={listRef}>
            {subListItem.map((item)=>{
              return(
                <TouchableOpacity
                  style={styles.packetsContainer}
                  activeOpacity={0.7}
                  onPress={onSubListPress}
                >
                  <View style={commonStyles.flexRow}>
                    <Text style={styles.srNoText}>{`${item?.srNo}.`}</Text>
                    <Text style={styles.uniqText}>{`ROB:`}</Text>
                    <Text style={styles.qtyText}>{item?.rob}</Text>
                    <Text style={[styles.uniqText, styles.marginLeft]}>{`Scanned Qty:`}</Text>
                    <Text style={styles.qtyText}>{item?.scannedQty}</Text>
                  </View>
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
                </TouchableOpacity>
              )
            })}
          </Animated.View>
        </Animated.View>
        
    </Pressable>
  );
};

export default InventoryDetailListItem;

const styles = StyleSheet.create({
  container: {
    padding: wp(5.5),
    borderBottomWidth: wp(0.2),
    borderBottomColor: colors.grey,
    backgroundColor: colors.white
  },
  titleText: {
    color: colors.black,
    fontSize: fontSize(15),
    fontFamily: fonts.medium,
  },
  descText: {
    color: colors.darkGrey,
    fontSize: fontSize(14),
    fontFamily: fonts.medium,
    marginVertical: wp(0.5),
  },
  tagContainer: {
    marginTop: wp(3),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  tagSubContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  tagView: {
    borderWidth: wp(0.2),
    paddingVertical: wp(1),
    borderRadius: wp(1.33),
    paddingHorizontal: wp(3),
  },
  tagText: {
    color: colors.orange,
    fontSize: fontSize(12),
    fontFamily: fonts.medium,
  },
  qtyContainer: {
    marginTop: hp(2),
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
  qtyText: {
    color: colors.black,
    fontSize: fontSize(15),
    fontFamily: fonts.medium,
  },
  srNoText: {
    width: wp(7),
    marginLeft: wp(1), 
    color: colors.black,
    fontSize: fontSize(15),
    fontFamily: fonts.medium,
  },
  marginLeft: {
    marginLeft: wp(4),
  },
  downArrowStyle:{
    width: wp(3.3),
    height: wp(3.3),
    resizeMode:'contain',
    tintColor: colors.greyText,
  },
  packetsContainer: {
    padding: wp(2),
    alignItems:'center', 
    flexDirection:'row', 
    borderWidth: wp(0.2), 
    borderRadius: wp(1.6), 
    marginVertical: hp(0.5),
    borderColor: colors.grey, 
    justifyContent:'space-between', 
  },
  contentContainer: {
    top: 0,
    width: '100%',
    position: 'absolute',
  },
});

