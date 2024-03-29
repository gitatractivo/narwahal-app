import React from 'react';

import {colors} from './colorConstant';
import * as Icons from './svgIndex';
import {wp} from './globalConstant';
import {SvgIconsProps} from '../interface/common';

const SvgIconElement = (props: any) => {
  const Icon = GetIconFromLibrary(props.name);
  return (
    <Icon
      fill={props.fill}
      width={props.width}
      height={props.height}
      disable={props.disable}
      gradient={props.gradient}
      iconBorderColor={props.iconBorderColor}
      testID={`${props.testID}_${'SvgIconElement'}_${'1icon'}`}
    />
  );
};

const GetIconFromLibrary = (name: string) => {
  switch (name) {
    case 'target':
      return Icons.Target;
    case 'downArrow':
      return Icons.DownArrow;
    case 'checkMark':
      return Icons.CheckMark;
    case 'menu':
      return Icons.Menu;
    case 'pencil':
      return Icons.Pencil;
    case 'box':
      return Icons.Box;
    case 'checkOut':
      return Icons.CheckOut;
    case 'checkIn':
      return Icons.CheckIn;
    case 'wrench':
      return Icons.Wrench;
    case 'chevronRight':
      return Icons.ChevronRight;
    case 'pin':
      return Icons.Pin;
    case 'menuClose':
      return Icons.MenuClose;
    case 'connectivity':
      return Icons.Connectivity;
    case 'deviceInfo':
      return Icons.DeviceInfo;
    case 'setting':
      return Icons.Setting;
    case 'queMarkBlue':
      return Icons.QueMarkBlue;
    case 'scanningFiles':
      return Icons.ScanningFiles;
    case 'manage':
      return Icons.Manage;
    case 'addFiles':
      return Icons.AddFiles;
    case 'scanFile':
      return Icons.ScanFile;
    case 'close':
      return Icons.Close;
    case 'scanComplete':
      return Icons.ScanComplete;
    case 'plus':
      return Icons.Plus;
    case 'scanQR':
      return Icons.ScanQR;
    case 'barcodeReader':
      return Icons.BarcodeReader;
    case 'checkMarkBlue':
      return Icons.CheckMarkBlue;
    case 'wrenchHalf':
      return Icons.WrenchHalf;
    case 'location':
      return Icons.Location;
    case 'chevronRightLite':
      return Icons.ChevronRightLite;

    default:
      return Icons.Target;
  }
};

const SvgIcons = (props: SvgIconsProps) => {
  const removeColorHandler = () => {
    if (!props.removeColor) {
      if (props.iconColor) {
        return props.iconColor;
      } else {
        return colors.black;
      }
    } else {
      return undefined;
    }
  };
  const getFillColor = () => {
    if (props.disable) {
      return '#B9BDC6';
    } else {
      return removeColorHandler();
    }
  };

  return (
    <>
      <SvgIconElement
        name={props.iconName}
        fill={getFillColor()}
        disable={props.disable}
        gradient={props.gradient}
        iconBorderColor={props.iconBorderColor}
        width={props.width ? props.width : wp(6.4)}
        height={props.height ? props.height : wp(6.4)}
      />
    </>
  );
};

export default SvgIcons;
