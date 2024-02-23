import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import PMSscreen from '../../screens/pms/PMSscreen';
import {NavigationContainer} from '@react-navigation/native';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  CheckInNewSpareListItem,
  FAB,
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
} from '../../helper/dataConstant';
import CheckInSpareList from '../../components/common/CheckInSpareListItem';
import CheckInDockListItem from '../../components/common/CheckInDockListItem';

const Tab = createMaterialTopTabNavigator();

function Spares({navigation}: any) {
  const renderCheckInSpareList = ({item}: any) => {
    return <CheckInSpareList item={item} onPress={() => {}} />;
  };

  return (
    <View style={commonStyles.root}>
      <View style={styles.statusBarView}>
        <View></View>
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
        data={checkInSpareList}
        renderItem={renderCheckInSpareList}
        keyExtractor={item => item?.id?.toString()}
        contentContainerStyle={commonStyles.contentContainerStyle}
      />
    </View>
  );
}

function NewSpares({navigation}: any) {
  const renderCheckInNewSpareList = ({item}: any) => {
    return <CheckInNewSpareListItem item={item} onPress={() => {}} />;
  };

  return (
    <View style={commonStyles.root}>
      <View style={styles.statusBarView}>
        <View></View>
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
        data={checkInNewSpareList}
        renderItem={renderCheckInNewSpareList}
        keyExtractor={item => item?.id?.toString()}
        contentContainerStyle={commonStyles.contentContainerStyle}
      />
    </View>
  );
}

function DryDock({navigation}: any) {
  const renderCheckInDockList = ({item}: any) => {
    return <CheckInDockListItem item={item} onPress={() => {}} />;
  };
  return (
    <View style={commonStyles.root}>
      <View style={styles.statusBarView}>
        <View></View>
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
        data={checkInDockList}
        renderItem={renderCheckInDockList}
        keyExtractor={item => item?.id?.toString()}
        contentContainerStyle={commonStyles.contentContainerStyle}
      />
    </View>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Spares"
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
        name="Spares"
        component={Spares}
        options={{tabBarLabel: 'Spares'}}
      />
      <Tab.Screen
        name="NewSpares"
        component={NewSpares}
        options={{tabBarLabel: 'New Spares'}}
      />
      <Tab.Screen
        name="DryDock"
        component={DryDock}
        options={{tabBarLabel: 'DryDock'}}
      />
    </Tab.Navigator>
  );
}

export default function CheckInTopBarNavigation() {
  return <MyTabs />;
}

const styles = StyleSheet.create({
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
});
