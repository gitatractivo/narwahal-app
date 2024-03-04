import React, {FC, useState} from 'react';
import {View, StyleSheet} from 'react-native';

import {commonStyles} from '../../helper';
import {SearchBox} from '../../components';
import {PMSscreenProps} from '../../interface/common';
import {PMStopTabs} from '../../navigation/topBarTabs/TopTabsData';
import CustomTopTabs from '../../navigation/topBarTabs/CustomTopTabs';

const PMSscreen: FC<PMSscreenProps> = ({navigation}) => {
  const [searchText, setSearchText] = useState<string>('');

  return (
    <View style={commonStyles.root}>
      <SearchBox
        value={searchText}
        onChangeText={text => setSearchText(text)}
      />
      <CustomTopTabs screens={PMStopTabs} />
    </View>
  );
};

export default PMSscreen;

const styles = StyleSheet.create({});
