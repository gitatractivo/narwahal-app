import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import PMSscreen from '../../screens/pms/PMSscreen';
import {NavigationContainer} from '@react-navigation/native';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  CheckInNewSpareListItem,
  FAB,
  InventorySecondListItem,
  ListItem,
  SearchBox,
} from '../../components';
import {
  colors,
  commonStyles,
  fontSize,
  fonts,
  hp,
  sailingData,
  wp,
} from '../../helper';
import SvgIcons from '../../helper/SvgIcons';
import {
  checkInDockList,
  checkInNewSpareList,
  checkInSpareList,
  inventorySecondFloorList,
} from '../../helper/dataConstant';
import CheckInSpareList from '../../components/common/CheckInSpareListItem';
import CheckInDockListItem from '../../components/common/CheckInDockListItem';

const Tab = createMaterialTopTabNavigator();

function SecondFloor({navigation}: any) {
  const renderInventorySecondFloorList = ({item}: any) => {
    return <InventorySecondListItem item={item} onPress={() => {}} />;
  };

  return (
    <View style={commonStyles.root}>
      <TouchableOpacity
        onPress={() => {}}
        activeOpacity={0.7}
        style={styles.statusBarView}>
        <Text style={styles.stausText}>{`Inventory type`}</Text>
        <SvgIcons iconName="chevronRight" />
      </TouchableOpacity>

      <FlatList
        bounces={false}
        data={inventorySecondFloorList}
        renderItem={renderInventorySecondFloorList}
        keyExtractor={item => item?.id?.toString()}
        contentContainerStyle={commonStyles.contentContainerStyle}
      />
    </View>
  );
}

function ThirdFloor({navigation}: any) {
  const renderInventorySecondFloorList = ({item}: any) => {
    return <InventorySecondListItem item={item} onPress={() => {}} />;
  };

  return (
    <View style={commonStyles.root}>
      <TouchableOpacity
        onPress={() => {}}
        activeOpacity={0.7}
        style={styles.statusBarView}>
        <Text style={styles.stausText}>{`Inventory type`}</Text>
        <SvgIcons iconName="chevronRight" />
      </TouchableOpacity>

      <FlatList
        bounces={false}
        data={inventorySecondFloorList}
        renderItem={renderInventorySecondFloorList}
        keyExtractor={item => item?.id?.toString()}
        contentContainerStyle={commonStyles.contentContainerStyle}
      />
    </View>
  );
}

function BosunStore({navigation}: any) {
  const renderInventorySecondFloorList = ({item}: any) => {
    return <InventorySecondListItem item={item} onPress={() => {}} />;
  };

  return (
    <View style={commonStyles.root}>
      <TouchableOpacity
        onPress={() => {}}
        activeOpacity={0.7}
        style={styles.statusBarView}>
        <Text style={styles.stausText}>{`Inventory type`}</Text>
        <SvgIcons iconName="chevronRight" />
      </TouchableOpacity>

      <FlatList
        bounces={false}
        data={inventorySecondFloorList}
        renderItem={renderInventorySecondFloorList}
        keyExtractor={item => item?.id?.toString()}
        contentContainerStyle={commonStyles.contentContainerStyle}
      />
    </View>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="SecondFloor"
      screenOptions={{
        tabBarActiveTintColor: colors.black,
        tabBarInactiveTintColor: colors.darkGrey,
        tabBarLabelStyle: {
          fontSize: fontSize(15),
          fontFamily: fonts.medium,
          textTransform: 'none',
        },
        tabBarStyle: {backgroundColor: colors.white},
        tabBarIndicatorStyle: {backgroundColor: colors.black},
      }}>
      <Tab.Screen
        name="SecondFloor"
        component={SecondFloor}
        options={{tabBarLabel: '2nd Floor'}}
      />
      <Tab.Screen
        name="ThirdFloor"
        component={ThirdFloor}
        options={{tabBarLabel: '3rd Floor'}}
      />
      <Tab.Screen
        name="BosunStore"
        component={BosunStore}
        options={{tabBarLabel: 'Bosun Store'}}
      />
    </Tab.Navigator>
  );
}

export default function InventoryTopBarNavigation() {
  return <MyTabs />;
}

const styles = StyleSheet.create({
  statusBarView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: wp(3),
    paddingHorizontal: wp(5),
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
    color: colors.black,
    fontSize: fontSize(15),
    fontFamily: fonts.medium,
  },
  completedText: {
    marginRight: wp(2),
    color: colors.green,
    fontSize: fontSize(11),
    fontFamily: fonts.medium,
  },
});
