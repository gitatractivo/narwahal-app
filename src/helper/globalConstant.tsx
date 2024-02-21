import {Platform} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';

export const wp = (val: number) => {
  return widthPercentageToDP(val);
};

export const hp = (val: number) => {
  return heightPercentageToDP(val);
};

export const fontSize = (val: number) => RFValue(val, 812);

export const isIos = Platform.OS === 'ios' ? true : false;

export const deviceType = Platform.OS === 'ios' ? 'ios' : 'android';
