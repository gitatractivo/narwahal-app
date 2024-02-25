import {FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors, commonStyles, fontSize, fonts} from '../../helper';
import {CheckOutListItem, FAB, SearchBox} from '../../components';
import {checkOutList} from '../../helper/dataConstant';

import {NativeModules} from 'react-native';
import { DeviceEventEmitter } from 'react-native';

const { TagReadModule } = NativeModules;

type Props = {};

const CheckOutScreen = ({navigation}: any) => {
  const [searchText, setSearchText] = useState<string>('');
  DeviceEventEmitter.addListener('ReadTag', (event) => {
    console.log('Read Tag: ', event);
  });

    useEffect(() => {
        TagReadModule.startInventoryTask();
        return () => {
            TagReadModule.stopInventoryTask();
        }
    }, []);

  const renderCheckOutList = ({item}: any) => {
    return <CheckOutListItem item={item} onPress={() => {}} />;
  };

  return (
    <View style={commonStyles.root}>
      <SearchBox
        value={searchText}
        onChangeText={text => setSearchText(text)}
      />

      <FlatList
        bounces={false}
        data={checkOutList}
        renderItem={renderCheckOutList}
        keyExtractor={item => item?.id?.toString()}
        contentContainerStyle={commonStyles.contentContainerStyle}
      />

      <FAB title={'Confirm'} onPress={() => {}} />
    </View>
  );
};

export default CheckOutScreen;

const styles = StyleSheet.create({});
