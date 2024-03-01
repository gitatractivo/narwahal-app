import {View} from 'react-native';
import React, {useState} from 'react';
import {commonStyles} from '../../helper';
import {SearchBox} from '../../components';
import { InventoryTopTabs } from '../../navigation/topBarTabs/TopTabsData';
import CustomScrollableTopTabs from '../../navigation/topBarTabs/CustomScrollableTopTabs';

const InventoryScreen = () => {
  const [searchText, setSearchText] = useState<string>('');

  return (
    <View style={commonStyles.root}>
      <SearchBox
        value={searchText}
        onChangeText={text => setSearchText(text)}
      />
      <CustomScrollableTopTabs screens={InventoryTopTabs} />
    </View>
  );
};

export default InventoryScreen;