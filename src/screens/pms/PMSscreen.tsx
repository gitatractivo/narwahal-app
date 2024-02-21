import React, {FC, useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

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

const data = [
  { label: 'Completed', value: 'completed' },
  { label: 'Planning', value: 'planning' },
  { label: 'In Progress', value: 'in_progress' },

];

const PMSscreen: FC<PMSscreenProps> = ({navigation}) => {
  const [searchText, setSearchText] = useState<string>('');
  const [topTabData, setTopTabData] = useState<TopTabProps[]>(topTabArray);
  const [value, setValue] = useState<string>('completed');
  const [due, setDue] = useState<string>("daily");
  const [sailingData, setSailingData] = useState<PmsScreenItem[]>([])


  const getData =async()=>{
    // const resp = await 
  }

  useEffect(()=>{
    getData()
  },[])

  

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
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              // search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select item"
              value={value}
              onChange={item => {
                setValue(item.value);
              }}
              // renderLeftIcon={() => (
              //   <SvgIcons iconName="downArrow" />
              // )}
            />
          {/* <TouchableOpacity style={styles.flexRow}>
            
          </TouchableOpacity> */}
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
  dropdown: {
    margin: 16,
    height: 50,  
    width:80,
  },
  placeholderStyle: {
    color:'#0FABA6',
    fontSize: 11,
    fontFamily: fonts.medium,
  },
  selectedTextStyle: {
    fontSize: fontSize(11),
    color: '#0FABA6',
    fontFamily: fonts.medium,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
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

export interface PmsScreenItem {
  id: number;
  tag: string;
  date: string;
  desc: string;
}
