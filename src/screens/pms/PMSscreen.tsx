import React, {FC, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import {
  hp,
  wp,
  fonts,
  colors,
  fontSize,
  topTabArray,
  sailingData,
  commonStyles,
} from '../../helper';
import SvgIcons from '../../helper/SvgIcons';
import {ListItem, SearchBox} from '../../components';
import {PMSscreenProps, TopTabProps} from '../../interface/common';

const PMSscreen: FC<PMSscreenProps> = ({navigation}) => {
  const [searchText, setSearchText] = useState<string>('');
  const [topTabData, setTopTabData] = useState<TopTabProps[]>(topTabArray);

  const renderSailingList = ({item}: any) => {
    return (
      <ListItem
        item={item}
        onPress={() =>
          navigation.navigate('PMSdetailScreen', {
            title: item?.title,
            desc: item?.desc,
          })
        }
      />
    );
  };

  const onTopTabPress = (item: TopTabProps) => {
    let updatedTopTabData = topTabData?.map(obj => {
      if (obj?.id === item?.id) {
        return {...obj, isSelected: true};
      } else {
        return {...obj, isSelected: false};
      }
    });
    setTopTabData(updatedTopTabData);
  };

  return (
    <View style={commonStyles.root}>
      <SafeAreaView />
      <SearchBox
        value={searchText}
        onChangeText={text => setSearchText(text)}
      />

      <View style={styles.toptabContainer}>
        {topTabData?.map(item => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                styles.tabButton,
                {
                  borderBottomColor: item?.isSelected
                    ? colors.black
                    : colors.transparent,
                },
              ]}
              onPress={() => onTopTabPress(item)}>
              <Text
                style={[
                  styles.tabText,
                  {
                    color: item?.isSelected ? colors.black : colors.darkGrey,
                  },
                ]}>
                {item?.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.statusBarView}>
        <TouchableOpacity style={styles.flexRow}>
          <Text style={styles.dailyText}>{`Daily`}</Text>
          <SvgIcons iconName="downArrow" />
        </TouchableOpacity>
        <View style={styles.flexRow}>
          <Text style={styles.stausText}>{`Status:`}</Text>
          <TouchableOpacity style={styles.flexRow}>
            <Text style={styles.completedText}>{`Completed`}</Text>
            <SvgIcons iconName="downArrow" />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        bounces={false}
        data={sailingData}
        renderItem={renderSailingList}
        keyExtractor={item => item?.id?.toString()}
        contentContainerStyle={commonStyles.contentContainerStyle}
      />
      <SafeAreaView />
    </View>
  );
};

export default PMSscreen;

const styles = StyleSheet.create({
  toptabContainer: {
    flexDirection: 'row',
    borderBottomWidth: wp(0.2),
    justifyContent: 'space-between',
    borderBottomColor: colors.mediumGrey,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(1.2),
    borderBottomWidth: wp(0.5),
  },
  tabText: {
    fontSize: fontSize(16),
    fontFamily: fonts.medium,
  },
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
  completedText: {
    marginRight: wp(2),
    color: colors.green,
    fontSize: fontSize(11),
    fontFamily: fonts.medium,
  },
});
