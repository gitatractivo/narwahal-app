import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {FilterBar, ListItem} from '../../components';
import {
  BASE_URL,
  ListFooterComponent,
  colors,
  commonStyles,
  fontSize,
  fonts,
  sailingData,
  wp,
} from '../../helper';
import axios from 'axios';
import {PmsScreenItem} from '../../interface/common';


export function Sailing({navigation}: any) {
  const [value, setValue] = useState<string>('planning');
  const [due, setDue] = useState<string>('daily');
  const [sailingData, setSailingData] = useState<PmsScreenItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const getData = async () => {
    try {
      const resp = await axios.get(
        `${BASE_URL}/pms/jobs?status=${value}&due_within=${due}`,
      );
      setSailingData(resp.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getData();
  }, [value, due]);
  const handleRefresh = () => {
    setRefreshing(true);
    getData();
  };

  const renderSailingList = ({item}: any) => {
    return (
      <ListItem
        item={item}
        onPress={() =>
          navigation.navigate('PMSdetailScreen', {
            id: item?.id,
            description: item?.description,
            status: item?.status,
          })
        }
      />
    );
  };

  const onStatusUpdatePress = (updatedStatus:string) => {
    setValue(updatedStatus)
  }

  const onPeriodUpdatePress = (updatedPeriod:string) => {
    setDue(updatedPeriod)
  }

  return (
    <View style={commonStyles.root}>
        <FilterBar 
          isPeriodVisible 
          onStatusUpdate={onStatusUpdatePress} 
          onPeriodUpdate={onPeriodUpdatePress}
        />

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="2e2e2e" />
          <Text>Loading...</Text>
        </View>
      ) : (
        <FlatList
          bounces={false}
          data={sailingData}
          renderItem={renderSailingList}
          keyExtractor={item => item?.id?.toString()}
          ListFooterComponent={ListFooterComponent}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      )}
    </View>
  );
}

export function Port({navigation}: any) {
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

  return (
    <View style={commonStyles.root}>
      <FilterBar isPeriodVisible />
      <FlatList
        bounces={false}
        data={sailingData}
        renderItem={renderSailingList}
        keyExtractor={item => item?.id?.toString()}
        ListFooterComponent={ListFooterComponent}
      />
    </View>
  );
}

export function Dock({navigation}: any) {
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
  return (
    <View style={commonStyles.root}>
      <FilterBar isPeriodVisible />
      <FlatList
        bounces={false}
        data={sailingData}
        renderItem={renderSailingList}
        keyExtractor={item => item?.id?.toString()}
        ListFooterComponent={ListFooterComponent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    width: 80,
  },
  dropdown2: {
    margin: 16,
    height: 50,
    width: 80,
  },
  placeholderStyle: {
    color: '#0FABA6',
    fontSize: 11,
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

  selectedTextStyle: {
    fontSize: fontSize(11),
    color: '#0FABA6',
    fontFamily: fonts.medium,
  },
  placeholderStyle2: {
    fontSize: 11,
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
    marginRight: wp(2),
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

  selectedTextStyle2: {
    fontSize: fontSize(11),
    fontFamily: fonts.medium,
  },

  loadingContainer: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
