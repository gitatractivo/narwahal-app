import {Dock, Port, Sailing} from './PMSTopBarNavigation';
import {DryDock, NewSpares, Spares} from './CheckInTopBarNavigation';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CheckInDetailScreen from '../../screens/checkIn/CheckInDetailScreen';
import {AllInventoryScreen, BosunStore, SecondFloor, ThirdFloor} from './InventoryTopBarNavigation';
import InventoryDetailScreen from '../../screens/inventory/InventoryDetailScreen';
import InventorySubListScreen from '../../screens/inventory/InventorySubListScreen';

const CheckInNewSpareStack = createNativeStackNavigator();
const CheckInDryDockStack = createNativeStackNavigator();

const InventoryStack = createNativeStackNavigator();
const Inventory2Stack = createNativeStackNavigator();
const Inventory3Stack = createNativeStackNavigator();
const InventoryBosunStack = createNativeStackNavigator();

function CheckInNewSpareStackScreen() {
  return (
    <CheckInNewSpareStack.Navigator screenOptions={{headerShown: false}}>
      <CheckInNewSpareStack.Screen name="NewSpares" component={NewSpares} />
      <CheckInNewSpareStack.Screen
        name="CheckInDetailScreen"
        component={CheckInDetailScreen}
      />
    </CheckInNewSpareStack.Navigator>
  );
}

function CheckInDryDockStackScreen() {
  return (
    <CheckInDryDockStack.Navigator screenOptions={{headerShown: false}}>
      <CheckInDryDockStack.Screen name="DryDock" component={DryDock} />
      <CheckInDryDockStack.Screen
        name="CheckInDetailScreen"
        component={CheckInDetailScreen}
      />
    </CheckInDryDockStack.Navigator>
  );
}

function InventoryStackScreen() {
  return (
    <InventoryStack.Navigator screenOptions={{headerShown: false}}>
      <InventoryStack.Screen name="AllInventoryScreen" component={AllInventoryScreen} />
      <InventoryStack.Screen
        name="InventorySubListScreen"
        component={InventorySubListScreen}
      />
      <InventoryStack.Screen
        name="InventoryDetailScreen"
        component={InventoryDetailScreen}
      />
    </InventoryStack.Navigator>
  );
}

function Inventory2StackScreen() {
  return (
    <Inventory2Stack.Navigator screenOptions={{headerShown: false}}>
      <Inventory2Stack.Screen name="SecondFloor" component={SecondFloor} />
      <Inventory2Stack.Screen
        name="InventoryDetailScreen"
        component={InventoryDetailScreen}
      />
    </Inventory2Stack.Navigator>
  );
}

function Inventory3StackScreen() {
  return (
    <Inventory3Stack.Navigator screenOptions={{headerShown: false}}>
      <Inventory3Stack.Screen name="ThirdFloor" component={ThirdFloor} />
      <Inventory3Stack.Screen
        name="InventoryDetailScreen"
        component={InventoryDetailScreen}
      />
    </Inventory3Stack.Navigator>
  );
}

function InventoryBosunStackScreen() {
  return (
    <InventoryBosunStack.Navigator screenOptions={{headerShown: false}}>
      <InventoryBosunStack.Screen name="BosunStore" component={BosunStore} />
      <InventoryBosunStack.Screen
        name="InventoryDetailScreen"
        component={InventoryDetailScreen}
      />
    </InventoryBosunStack.Navigator>
  );
}

export const PMStopTabs = [
  {
    id: 1,
    name: 'Sailing',
    tabBarLabel: 'Sailing',
    component: Sailing,
  },
  {
    id: 2,
    name: 'Port',
    tabBarLabel: 'Port',
    component: Port,
  },
  {
    id: 3,
    name: 'Dock',
    tabBarLabel: 'Dock',
    component: Dock,
  },
];

export const CheckInTopTabs = [
  {
    id: 1,
    name: 'Spares',
    tabBarLabel: 'Spares',
    component: Spares,
  },
  {
    id: 2,
    name: 'NewSpares',
    tabBarLabel: 'New Spares',
    component: CheckInNewSpareStackScreen,
  },
  {
    id: 3,
    name: 'DryDock',
    tabBarLabel: 'DryDock',
    component: CheckInDryDockStackScreen,
  },
];

export const InventoryTopTabs = [
  {
    id: 1,
    name: 'AllInventoryScreen',
    tabBarLabel: 'All',
    component: InventoryStackScreen,
  },
  {
    id: 2,
    name: 'SecondFloor',
    tabBarLabel: '2nd Floor',
    component: Inventory2StackScreen,
  },
  {
    id: 3,
    name: 'ThirdFloor',
    tabBarLabel: '3rd Floor',
    component: Inventory3StackScreen,
  },
  {
    id: 4,
    name: 'BosunStore',
    tabBarLabel: 'Deck floor',
    component: InventoryBosunStackScreen,
  },
];
