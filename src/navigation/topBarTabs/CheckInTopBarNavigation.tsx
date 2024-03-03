import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PMSscreen from '../../screens/pms/PMSscreen';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  BottomSheet,
  CheckInNewSpareListItem,
  CommonButton,
  FAB,
  ListItem,
  SearchBox,
} from '../../components';
import {
  BASE_URL,
  colors,
  commonStyles,
  fontSize,
  fonts,
  hp,
  isIos,
  sailingData,
  wp,
} from '../../helper';
import SvgIcons from '../../helper/SvgIcons';
import {
  checkInDockList,
  checkInNewSpareList,
  // checkInSpareList,
} from '../../helper/dataConstant';
import CheckInSpareList from '../../components/common/CheckInSpareListItem';
import CheckInDockListItem from '../../components/common/CheckInDockListItem';
import { useEffect, useState } from "react";
import { NativeModules } from 'react-native';
import { DeviceEventEmitter } from 'react-native';
import axios from 'axios';
import { RfidProductProp } from '../../interface/common';
import { TextInput } from 'react-native-gesture-handler';

const { TagReadModule } = NativeModules;

const Tab = createMaterialTopTabNavigator();

function Spares({ navigation }: any) {
  const [editModal, setEditModal] = useState<boolean>(false);
  const [tags, setTags] = useState<string[]>([])
  const [products, setProducts] = useState<RfidProductProp[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectProduct, setSelectProduct] = useState<RfidProductProp | null>()
  const [quantity, setQuantity] = useState<number>(0)


  useEffect(() => {

    TagReadModule.startInventoryTask();
    console.log('startInventoryTask')
    const sub = DeviceEventEmitter.addListener('ReadTag', (event) => {
      let tag = event.match(/[0-9A-F]{24}/i)[0];

      // console.log('Read Tag: ', tag);
      const arr = tags
      if (!arr.includes(tag)) {
        arr.push(tag)
        setTags(prev => [...prev,tag]);
      }
    });

    return () => {
      console.log("cleanup");
      TagReadModule.stopInventoryTask();
      sub.remove();
    };
  }, []);

  useEffect(() => {
    console.log('tadgs', tags);
    if (tags.length > 0) {
      // removeDuplicates();
      setIsLoading(true);
      getTags();
    }
  }, [tags])

  const handleSave = async () => {
    try {
      const resp = await axios.post(`${BASE_URL}/pms/scan_products?scan_type=checkin`, [
        {
          "product_id": selectProduct?.product.id,
          "quantity": quantity
        }
      ])
      setEditModal(false)
      setSelectProduct(null)
      setQuantity(0)
    } catch (error) {
      console.log(error)
    }
  }

  const getTags = async () => {
    const tagArr = tags.map(tag => ({ tag }))
    try {
      const products = await axios.post(`${BASE_URL}/check_in/product_details`, tagArr,
        {
          headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
          }
        })
      console.log('produckts',products.data)
      const pro = products.data.map((product:any,index:number)=>{
        return{
          product:{
            id: product.id,
            material_desc: product.maker_desc,
            maker_desc: product.material_desc,
            part_no: product.part_no
          },
          rob:1,
          rfid:tags[index]
          }
        }
      )
      setProducts(pro)

        // / { "id": "VS.BWS.9008144", "maker_desc": "GEORIM ENGINEERING CO., LTD.", "material_desc": "OVERCURRENT RELAY", "part_no": "GR-100-002-10" }

     
    } catch (error) {
      console.log('error', error)
    }
    finally {
      setIsLoading(false)
    }
  }

  const handleSelect = (item:any) => {
    setSelectProduct(item);
    setEditModal(true);
  }

  const renderCheckInSpareList = ({ item }: any) => {
    return <CheckInSpareList item={item} onPress={()=>handleSelect(item)} />;
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



      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="2e2e2e" />
          <Text>Loading...</Text>
        </View>
      ) : <FlatList
        bounces={false}
        data={products}
        renderItem={renderCheckInSpareList}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={commonStyles.contentContainerStyle}
      />}

      <BottomSheet
        isVisible={editModal}
        closeSheet={() => setEditModal(false)}
      >
        <>
          <View style={styles.modalMainBox}>

          </View>
          <View style={styles.modalSubTitleView}>
            <SvgIcons iconName="pencil" />
            <Text style={styles.subTitleText}>{`Edit`}</Text>
          </View>
          <View style={styles.modalInputView}>
            <Text style={styles.modalLabelText}>{`Scanned Qty:`}</Text>
            <View style={styles.modalInputContainer}>
              <Text
                style={styles.modalInputStyle}
              >{selectProduct?.rob}</Text>
            </View>
          </View>
          <View style={styles.modalInputView}>
            <Text style={styles.modalLabelText}>{`Package Qty:`}</Text>
            <View style={styles.modalInputContainer}>
              <Text
                style={styles.modalInputStyle}
              >{selectProduct?.rob ?? 0 + quantity}</Text>
            </View>
          </View>
          <View style={styles.modalInputView}>
            <Text style={styles.modalLabelText}>{`CheckIn Qty:`}</Text>
            <View style={styles.modalInputContainer}>
              <TextInput
                style={styles.modalInputStyle}
                keyboardType="numeric"
                value={quantity?.toString()}
                onChangeText={(text) => setQuantity(Number(text))}
              />
            </View>
          </View>
          <View style={styles.modalButtonContainer}>
            <CommonButton
              title={'Save'}
              onPress={handleSave}
            />
          </View>
        </>
        {/* <PMSDetailBottomSheetView /> */}
      </BottomSheet>

    </View>
  );
}

function NewSpares({ navigation }: any) {
  const renderCheckInNewSpareList = ({ item }: any) => {
    return <CheckInNewSpareListItem item={item} onPress={() => { }} />;
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

function DryDock({ navigation }: any) {
  const renderCheckInDockList = ({ item }: any) => {
    return <CheckInDockListItem item={item} onPress={() => { }} />;
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
        tabBarStyle: { backgroundColor: colors.white },
        tabBarIndicatorStyle: { backgroundColor: colors.black },
      }}>
      <Tab.Screen
        name="Spares"
        component={Spares}
        options={{ tabBarLabel: 'Spares' }}
      />
      <Tab.Screen
        name="NewSpares"
        component={NewSpares}
        options={{ tabBarLabel: 'New Spares' }}
      />
      <Tab.Screen
        name="DryDock"
        component={DryDock}
        options={{ tabBarLabel: 'DryDock' }}
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


  loadingContainer: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    justifyContent: "center",
    alignItems: "center"
  },
  modalTitleView: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  modalMainBox: {
    borderBottomWidth: wp(0.2),
    borderBlockColor: colors.grey,
    paddingTop: wp(7),
    paddingLeft: wp(7),
    paddingBottom: wp(7),
  },
  modalTitleText: {
    marginLeft: wp(3),
    color: colors.black,
    fontSize: fontSize(18),
    fontFamily: fonts.medium,
  },
  modalSubTitleView: {
    width: '100%',
    padding: wp(7),
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  subTitleText: {
    marginLeft: wp(3),
    color: colors.black,
    fontSize: fontSize(18),
    fontFamily: fonts.medium,
  },
  modalInputView: {
    width: '72%',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: hp(1),
    justifyContent: 'space-between',
  },
  modalLabelText: {
    color: colors.darkGrey,
    fontSize: fontSize(16),
    fontFamily: fonts.regular,
  },
  modalInputContainer: {
    width: '55%',
    borderBottomWidth: wp(0.2),
    borderBlockColor: colors.grey,
    paddingVertical: isIos ? hp(1) : 0,
  },
  modalInputStyle: {
    color: colors.black,
    fontSize: fontSize(15),
    fontFamily: fonts.regular,
  },
  modalButtonContainer: {
    marginVertical: hp(4.5),
  },
});
