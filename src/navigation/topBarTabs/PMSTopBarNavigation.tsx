import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {FilterBar, PMSListItem} from '../../components';
import {
  BASE_URL,
  ListFooterComponent,
  commonStyles,
  sailingData,
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
      <PMSListItem
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
      <PMSListItem
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
      <PMSListItem
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
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
  },
});
