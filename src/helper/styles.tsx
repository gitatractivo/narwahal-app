import {StyleSheet} from 'react-native';
import {colors} from './colorConstant';
import {hp} from './globalConstant';

export const commonStyles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainerStyle: {
    paddingBottom: hp(10),
  },
});
