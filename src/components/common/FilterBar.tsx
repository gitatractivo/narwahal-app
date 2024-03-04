import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {Menu, MenuItem} from 'react-native-material-menu';

import SvgIcons from '../../helper/SvgIcons';
import {colors, fontSize, fonts, isIos, wp} from '../../helper';
import {periodMenu, statusMenu} from '../../helper/dataConstant';

const FilterBar = ({isPeriodVisible,onPeriodUpdate, onStatusUpdate}: any) => {
  const [period, setPeriod] = useState('Daily');
  const [status, setStatus] = useState('Planning');
  const [periodPopUp, setPeriodPopUp] = useState(false);
  const [statusPopUp, setStatusPopUp] = useState(false);

  return (
    <View>
      <View style={styles.statusBarView}>
        {isPeriodVisible ? (
          <TouchableOpacity
            style={styles.flexRow}
            onPress={() => setPeriodPopUp(true)}>
            <Text style={styles.dailyText}>{period}</Text>
            <SvgIcons iconName="downArrow" />
          </TouchableOpacity>
        ) : (
          <View></View>
        )}
        <View style={styles.flexRow}>
          <Text style={styles.stausText}>{`Status:`}</Text>
          <TouchableOpacity
            style={styles.flexRow}
            onPress={() => setStatusPopUp(true)}>
            <Text
              style={[
                styles.statusText,
                {
                  color:
                    status === 'Planning'
                      ? colors.cyan
                      : status === 'In-Progress'
                      ? colors.blueLight
                      : colors.green,
                },
              ]}>
              {status}
            </Text>
            <SvgIcons iconName="downArrow" />
          </TouchableOpacity>
        </View>
      </View>

      <Menu
        visible={periodPopUp}
        onRequestClose={() => setPeriodPopUp(false)}
        style={styles.menuPopUp}>
        <View style={styles.popupView}>
          {periodMenu.map((item, index) => (
            <MenuItem
              key={item.id}
              style={styles.menuItemStyle}
              onPress={() => {
                setPeriod(item?.title);
                onPeriodUpdate(item?.value)
                setPeriodPopUp(false);
              }}>
              <View style={{}}>
                <Text numberOfLines={1} style={styles.menuTextStyle}>
                  {item.title}
                </Text>
                {periodMenu?.length > index + 1 && (
                  <View style={styles.itemSeparatorStyle} />
                )}
              </View>
            </MenuItem>
          ))}
        </View>
      </Menu>

      <Menu
        visible={statusPopUp}
        onRequestClose={() => setStatusPopUp(false)}
        //@ts-ignore
        style={[styles.menuPopUp, {left: wp(64), width: wp(33)}]}>
        <View style={styles.popupView}>
          {statusMenu.map((item, index) => (
            <MenuItem
              key={item.id}
              style={styles.menuItemStyle}
              onPress={() => {
                setStatus(item?.title);
                onStatusUpdate(item?.value)
                setStatusPopUp(false);
              }}>
              <View style={{}}>
                <Text
                  numberOfLines={1}
                  style={[styles.menuTextStyle, {color: item?.color}]}>
                  {item.title}
                </Text>
                {statusMenu?.length > index + 1 && (
                  <View style={styles.itemSeparatorStyle} />
                )}
              </View>
            </MenuItem>
          ))}
        </View>
      </Menu>
    </View>
  );
};

export default FilterBar;

const styles = StyleSheet.create({
  statusBarView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: wp(3),
    paddingHorizontal: wp(6),
    justifyContent: 'space-between',
    backgroundColor: colors.lightGrey,
  },
  flexRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  dailyText: {
    marginRight: wp(1),
    color: colors.black,
    fontSize: fontSize(13),
    fontFamily: fonts.medium,
  },
  stausText: {
    marginRight: wp(2),
    color: colors.darkGrey,
    fontSize: fontSize(11),
    fontFamily: fonts.medium,
  },
  statusText: {
    marginRight: wp(2),
    fontSize: fontSize(11),
    fontFamily: fonts.medium,
  },
  menuPopUp: {
    left: wp(4),
    width: wp(24),
    borderRadius: wp(2),
    borderWidth: wp(0.2),
    borderColor: colors.grey,
    backgroundColor: colors.white,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    elevation: 15,
    shadowRadius: 5,
    shadowOpacity: 0.2,
    shadowColor: colors.dropShadow,
  },
  menuItemStyle: {
    padding: wp(1.33),
    marginVertical: wp(-1.33),
  },
  popupView: {
    overflow: 'hidden',
    borderRadius: wp(2),
  },
  menuTextStyle: {
    color: colors.black,
    fontSize: fontSize(12),
    paddingVertical: wp(3),
    fontFamily: fonts.regular,
    paddingLeft: isIos ? wp(4) : 0,
  },
  itemSeparatorStyle: {
    width: wp(20),
    height: wp(0.2),
    backgroundColor: colors.grey,
  },
});
