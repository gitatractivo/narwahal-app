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
  item?: PmsScreenItem;
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
  status?: string;
  iconName?: string;
  onPress: () => void;
}
export interface FABProgressiveProps {
  status?: string;
  iconName?: string;
  onPress: () => void;
  disable?: boolean;
  partial?: boolean;
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
  handleBar?: boolean;
  closeSheet: () => void;
  customStyle?: StyleProp<ViewStyle>;
  children: ReactElement[] | ReactElement;
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
  product: {
    id: string;
    material_desc: string;
    maker_desc: string;
    part_no: string;
  };
  rob: number;
  rfid: string;
};
export type RfidProductProp = {
  product: {
    id: string;
    material_desc: string;
    maker_desc: string;
    part_no: string;
  };
  rob: number;
  rfid: string;
};

export type PmsScreenItem = {
  id: number;
  products: PmsProduct[];
  due: string;
  description: string;
  status: string;
  pic: number;
  interval: number;
};

export type PmsProduct = {};
