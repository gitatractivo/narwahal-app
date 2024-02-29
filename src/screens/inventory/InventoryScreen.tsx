import {View} from 'react-native';
import React, {useState} from 'react';
import {commonStyles} from '../../helper';
import {SearchBox} from '../../components';
import CustomTopTabs from '../../navigation/topBarTabs/CustomTopTabs';
import { InventoryTopTabs } from '../../navigation/topBarTabs/TopTabsData';

const InventoryScreen = () => {
  const [searchText, setSearchText] = useState<string>('');

  return (
    <View style={commonStyles.root}>
      <SearchBox
        value={searchText}
        onChangeText={text => setSearchText(text)}
      />
      <CustomTopTabs screens={InventoryTopTabs} />
    </View>
  );
};

export default InventoryScreen;