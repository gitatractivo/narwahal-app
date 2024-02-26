import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { BASE_URL, commonStyles } from '../../helper';
import { FAB, SearchBox } from '../../components';
import CheckInTopBarNavigation from '../../navigation/topBarTabs/CheckInTopBarNavigation';


type Props = {};

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
      <CheckInTopBarNavigation  />
      <FAB status={'Confirm'} onPress={() => { }} />
    </View>
  );
};

export default CheckInScreen;

const styles = StyleSheet.create({});


