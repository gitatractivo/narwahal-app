import React, {FC, useState} from 'react';
import {View, StyleSheet} from 'react-native';

import {commonStyles} from '../../helper';
import {SearchBox} from '../../components';
import {PMSscreenProps} from '../../interface/common';
import PMSTopBarNavigation from '../../navigation/topBarTabs/PMSTopBarNavigation';

const PMSscreen: FC<PMSscreenProps> = ({navigation}) => {
  const [searchText, setSearchText] = useState<string>('');
  

  return (
    <View style={commonStyles.root}>
      <SearchBox
        value={searchText}
        onChangeText={text => setSearchText(text)}
      />
      <PMSTopBarNavigation />
    </View>
  );
};

export default PMSscreen;

const styles = StyleSheet.create({});
