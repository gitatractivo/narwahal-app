import { View } from 'react-native';
import React, { useState } from 'react';
import { BASE_URL, commonStyles } from '../../helper';
import { FAB, SearchBox } from '../../components';
import CustomTopTabs from '../../navigation/topBarTabs/CustomTopTabs';
import { CheckInTopTabs } from '../../navigation/topBarTabs/TopTabsData';

const CheckInScreen = () => {
  const [searchText, setSearchText] = useState<string>('');
  
  // const removeDuplicates = () => {
  //   // 
  // }


  return (
    <View style={commonStyles.root}>
      <SearchBox
        value={searchText}
        onChangeText={text => setSearchText(text)}
      />
     <CustomTopTabs screens={CheckInTopTabs} />
      <FAB status={'Confirm'} onPress={() => { }} />
    </View>
  );
};

export default CheckInScreen;