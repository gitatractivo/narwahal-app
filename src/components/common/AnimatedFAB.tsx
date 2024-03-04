import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import SvgIcons from '../../helper/SvgIcons';
import {colors, fontSize, fonts, hp, wp} from '../../helper';

const AnimatedFAB = ({onAddPress, onScanPress, isScanPressed, isScanFirst, onClosePress}: any) => {
  const [iconName, setIconName] = useState('manage');
  const isOpen = useSharedValue(false);
  const isScanned = useSharedValue(isScanPressed);
  const firstValue = useSharedValue(hp(2));
  const secondValue = useSharedValue(hp(2));
  const width = useSharedValue(130);
  const right = useSharedValue(20);
  const translateXText = useSharedValue(0);

  const progress = useDerivedValue(() =>
    isOpen.value ? withTiming(1) : withTiming(0),
  );

  const handlePress = () => {
    if (isOpen.value) {
      setIconName('manage');
      onClosePress && onClosePress();
      width.value = withTiming(hp(16));
      right.value = withTiming(20);
      translateXText.value = withTiming(0);
      firstValue.value = withTiming(hp(2));
      secondValue.value = withTiming(hp(2));
    } else {
      setIconName('close');
      width.value = withTiming(hp(6));
      right.value = withTiming(26);
      translateXText.value = withTiming(70);
      firstValue.value = withTiming(hp(10));
      secondValue.value = withTiming(hp(18));
    }
    isOpen.value = !isOpen.value;
  };

  const handleScanPress = () => {
    isScanned.value = !isScanned.value;
  };

  // useEffect(() => {
  //   if (isScanned.value === true) {
  //     if (isIos) {
  //       setTimeout(() => {
  //         isScanned.value = false;
  //       }, 3000);
  //     }
  //     isScanned.value = false;
  //   }
  // }, [isScanPressed]);

  const firstIcon = useAnimatedStyle(() => {
    return {
      bottom: firstValue.value,
      opacity: progress.value > 0.1 ? withTiming(1) : withTiming(0),
    };
  });

  const secondIcon = useAnimatedStyle(() => {
    return {
      bottom: secondValue.value,
      opacity: progress.value > 0.1 ? withTiming(1) : withTiming(0),
    };
  });

  const manageButton = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [colors.primary, colors.greyMedium],
    );
    return {
      width: width.value,
      right: right.value,
      backgroundColor: backgroundColor,
    };
  });

  const textAnimationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateXText.value,
        },
      ],
      opacity: isOpen.value ? withTiming(0) : withTiming(1),
    };
  });

  // const containerTranslateX = useAnimatedStyle(() => {
  //   return {
  //     transform: [
  //       {
  //         translateX: isScanned.value ? withTiming(90) : withTiming(0),
  //       },
  //     ],
  //     opacity: isScanned.value ? withTiming(0) : withTiming(1),
  //   };
  // });

  return (
    <Animated.View style={[styles.container]}>
      <Pressable
        onPress={() => {
          handleScanPress();
          onScanPress && onScanPress();
        }}>
        <Animated.View style={[styles.contentContainer, secondIcon, {backgroundColor: isScanFirst ? colors.green : colors.primary}]}>
          <SvgIcons iconName={isScanFirst ? 'scanComplete' : 'scanFile'} />
        </Animated.View>
      </Pressable>

      <Pressable
        onPress={() => {
          onAddPress && onAddPress();
        }}>
        <Animated.View style={[styles.contentContainer, firstIcon]}>
          <SvgIcons iconName={'addFiles'} />
        </Animated.View>
      </Pressable>

      <Pressable
        onPress={() => {
          handlePress();
        }}>
        <Animated.View
          style={[styles.fabBtnStyle, styles.shadowStyle, manageButton]}>
          <SvgIcons iconName={iconName} />
          <Animated.Text
            numberOfLines={1}
            style={[
              styles.titleText,
              {position: iconName === 'manage' ? 'relative' : 'absolute'},
              textAnimationStyle,
            ]}>
            {'Manage'}
          </Animated.Text>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
};

export default AnimatedFAB;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    width: hp(6),
    height: hp(6),
    right: wp(6.9),
    position: 'absolute',
    alignItems: 'center',
    borderRadius: wp(100),
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  fabBtnStyle: {
    zIndex: 999,
    height: hp(6),
    bottom: hp(2),
    right: wp(5.33),
    position: 'absolute',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: wp(100),
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  shadowStyle: {
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 4,
    shadowRadius: 8,
    shadowOpacity: 0.25,
    shadowColor: colors.black,
  },
  titleText: {
    marginLeft: wp(1),
    color: colors.white,
    fontSize: fontSize(18),
    fontFamily: fonts.medium,
    // position: 'absolute',
  },
});
