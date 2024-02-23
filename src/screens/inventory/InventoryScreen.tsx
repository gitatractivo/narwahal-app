import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {commonStyles} from '../../helper';
import {SearchBox} from '../../components';
import InventoryTopBarNavigation from '../../navigation/topBarTabs/InventoryTopBarNavigation';

const InventoryScreen = () => {
  const [searchText, setSearchText] = useState<string>('');

  return (
    <View style={commonStyles.root}>
      <SearchBox
        value={searchText}
        onChangeText={text => setSearchText(text)}
      />
      <InventoryTopBarNavigation />
    </View>
  );
};

export default InventoryScreen;

const styles = StyleSheet.create({});
