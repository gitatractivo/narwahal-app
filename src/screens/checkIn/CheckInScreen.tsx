import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {commonStyles} from '../../helper';
import {FAB, SearchBox} from '../../components';
import CheckInTopBarNavigation from '../../navigation/topBarTabs/CheckInTopBarNavigation';

type Props = {};

const CheckInScreen = () => {
  const [searchText, setSearchText] = useState<string>('');

  return (
    <View style={commonStyles.root}>
      <SearchBox
        value={searchText}
        onChangeText={text => setSearchText(text)}
      />
      <CheckInTopBarNavigation />
      <FAB title={'Confirm'} onPress={() => {}} />
    </View>
  );
};

export default CheckInScreen;

const styles = StyleSheet.create({});
