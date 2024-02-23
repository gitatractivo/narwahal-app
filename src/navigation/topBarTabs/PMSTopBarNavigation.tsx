import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PMSscreen from '../../screens/pms/PMSscreen';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ListItem, SearchBox } from '../../components';
import {
  BASE_URL,
  colors,
  commonStyles,
  fontSize,
  fonts,
  hp,
  sailingData,
  wp,
} from '../../helper';
import SvgIcons from '../../helper/SvgIcons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { PmsScreenItem } from '../../interface/common';
import { Dropdown } from 'react-native-element-dropdown';

const Tab = createMaterialTopTabNavigator();

const data = [
  { label: 'Completed', value: 'completed' },
  { label: 'Planning', value: 'planning' },
  { label: 'In Progress', value: 'in_progress' },

];
const durationData = [
  { label: 'Daily', value: 'daily' },
  { label: 'Monthly', value: 'weekly' },
  { label: 'Weekly', value: 'monthly' },

];

function Sailing({ navigation }: any) {
  const [value, setValue] = useState<string>('planning');
  const [due, setDue] = useState<string>("daily");
  const [sailingData, setSailingData] = useState<PmsScreenItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);


  const getData = async () => {
    try {
      const resp = await axios.get(`${BASE_URL}/pms/jobs?status=${value}&due_within=${due}`);
      setSailingData(resp.data);
    } catch (error) {
      console.log(error);

    } finally {
      setIsLoading(false);
      setRefreshing(false)
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getData();
  }, [value, due]);
  const handleRefresh = () => {
    setRefreshing(true)
    getData()

  }

  const renderSailingList = ({ item }: any) => {
    return (
      <ListItem
        item={item}
        onPress={() =>
          navigation.navigate('PMSdetailScreen', {
            id: item?.id,
            description: item?.description,
            status: item?.status


          })
        }
      />
    );
  };

  return (
    <View style={commonStyles.root}>
      <View style={styles.statusBarView}>
        <TouchableOpacity style={styles.flexRow}>
          <Text style={styles.dailyText}>{`Daily`}</Text>
          <Dropdown
            style={styles.dropdown2}
            placeholderStyle={styles.placeholderStyle2}
            selectedTextStyle={styles.selectedTextStyle2}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={durationData}
            // search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select item"
            value={due}
            onChange={item => {
              setDue(item.value);
            }}
          // renderLeftIcon={() => (
          //   <SvgIcons iconName="downArrow" />
          // )}
          />
        </TouchableOpacity>
        <View style={styles.flexRow}>
          <Text style={styles.stausText}>{`Status:`}</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            // search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select item"
            value={value}
            onChange={item => {
              setValue(item.value);
            }}
          // renderLeftIcon={() => (
          //   <SvgIcons iconName="downArrow" />
          // )}
          />
        </View>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="2e2e2e" />
          <Text>Loading...</Text>
        </View>
      ) : (<FlatList
        bounces={false}
        data={sailingData}
        renderItem={renderSailingList}
        keyExtractor={item => item?.id?.toString()}
        contentContainerStyle={commonStyles.contentContainerStyle}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />)}
    </View>
  );
}

function Port({ navigation }: any) {
  const renderSailingList = ({ item }: any) => {
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
      <View style={styles.statusBarView}>
        <TouchableOpacity style={styles.flexRow}>
          <Text style={styles.dailyText}>{`Daily`}</Text>
          <SvgIcons iconName="downArrow" />
        </TouchableOpacity>
        <View style={styles.flexRow}>
          <Text style={styles.stausText}>{`Status:`}</Text>
          <TouchableOpacity style={styles.flexRow}>
            <Text style={styles.completedText}>{`Completed`}</Text>
            <SvgIcons iconName="downArrow" />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        bounces={false}
        data={sailingData}
        renderItem={renderSailingList}
        keyExtractor={item => item?.id?.toString()}
        contentContainerStyle={commonStyles.contentContainerStyle}
      />
    </View>
  );
}

function Dock({ navigation }: any) {
  const renderSailingList = ({ item }: any) => {
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
      <View style={styles.statusBarView}>
        <TouchableOpacity style={styles.flexRow}>
          <Text style={styles.dailyText}>{`Daily`}</Text>
          <SvgIcons iconName="downArrow" />
        </TouchableOpacity>
        <View style={styles.flexRow}>
          <Text style={styles.stausText}>{`Status:`}</Text>
          <TouchableOpacity style={styles.flexRow}>
            <Text style={styles.completedText}>{`Completed`}</Text>
            <SvgIcons iconName="downArrow" />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        bounces={false}
        data={sailingData}
        renderItem={renderSailingList}
        keyExtractor={item => item?.id?.toString()}
        contentContainerStyle={commonStyles.contentContainerStyle}
      />
    </View>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Sailing"
      screenOptions={{
        tabBarActiveTintColor: colors.black,
        tabBarInactiveTintColor: colors.darkGrey,
        tabBarLabelStyle: {
          fontSize: fontSize(15),
          fontFamily: fonts.medium,
          textTransform: 'none',
        },
        tabBarStyle: { backgroundColor: colors.white },
        tabBarIndicatorStyle: { backgroundColor: colors.black },
      }}>
      <Tab.Screen
        name="Sailing"
        component={Sailing}
        options={{ tabBarLabel: 'Sailing' }}
      />
      <Tab.Screen
        name="Port"
        component={Port}
        options={{ tabBarLabel: 'Port' }}
      />
      <Tab.Screen
        name="Dock"
        component={Dock}
        options={{ tabBarLabel: 'Dock' }}
      />
    </Tab.Navigator>
  );
}

export default function PMSTopBarNavigation() {
  return <MyTabs />;
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
  justifyContent: "center",
  alignItems: "center"
},
});
