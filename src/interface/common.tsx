import {ReactElement} from 'react';
import {
  StyleProp,
  TextStyle,
  ViewStyle,
  ColorValue,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  ReturnKeyTypeOptions,
  TextInputChangeEventData,
  TextInputSubmitEditingEventData,
} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {BottomStackParamList} from '../navigation/BottomTabNavigation';

export type PMSscreenProps = NativeStackScreenProps<
  BottomStackParamList,
  'PMSscreen'
>;

export type PMSdetailScreenProps = NativeStackScreenProps<
  BottomStackParamList,
  'PMSdetailScreen'
>;

export type BottomTabItemProps = {
  focused: boolean;
  iconName: string;
  tabTitle: string;
};

export type CommonButtonProps = {
  title: string;
  onPress: () => void;
  isBtnDisable?: boolean;
  additionalBtnStyle?: StyleProp<ViewStyle>;
  additionalTitleStyle?: StyleProp<TextStyle>;
};

export type ListItemProps = {
  onPress: () => void;
  item?: SailingDataProps;
};

export type DetailListItemProps = {
  onPress: () => void;
  item?: DetailDataProps;
};

export interface ShadowProps {
  children?: any;
  shadowStyle?: StyleProp<ViewStyle>;
}
export interface FABProps {
  onPress: () => void;
}

export type SvgIconsProps = {
  uri?: boolean;
  width?: number;
  height?: number;
  testID?: string;
  iconName?: string;
  disable?: boolean;
  iconColor?: string;
  gradient?: boolean;
  removeColor?: boolean;
  iconBorderColor?: string;
};

export interface SearchBoxProps {
  value: string;
  editable?: boolean;
  maxLength?: number;
  autoFocus?: boolean;
  additionalStyle?: any;
  blurOnSubmit?: boolean;
  secureTextEntry?: boolean;
  inputStyle?: StyleProp<ViewStyle>;
  placeholderTextColor?: ColorValue;
  keyboardType?: KeyboardTypeOptions;
  returnKeyType?: ReturnKeyTypeOptions;
  onChangeText: (text: string) => void;
  onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  onSubmitEditing?: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => void;
}

export type BottomSheetProps = {
  isVisible: boolean;
  closeSheet: () => void;
  sheetBody: ReactElement;
};

export type TopTabProps = {
  id: number;
  title: string;
  isSelected: boolean;
};

export type SailingDataProps = {
  id: number;
  tag: string;
  date: string;
  desc: string;
  title: string | any;
};
export type DetailDataProps = {
  id: number;
  tag: string;
  rob: number;
  title: string;
  pkgQty: number;
  uniqueID: string;
  checkoutQty: number;
  workingReplace: number;
};
