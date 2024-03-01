import {StyleSheet} from 'react-native';
import {colors} from './colorConstant';
import {hp} from './globalConstant';

export const commonStyles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  flex: {
    flex: 1,
  },
  flexRow: {
    flexDirection:'row', 
    alignItems:'center',
  }
});
