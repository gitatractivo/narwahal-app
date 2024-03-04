import { ActivityIndicator, Text,Alert, FlatList, StatusBar, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { BASE_URL, ListFooterComponent, colors, commonStyles, fontSize, fonts, hp, isIos, wp } from '../../helper';
import { BottomSheet, CheckOutListItem, CommonButton, FAB, SearchBox } from '../../components';
import { checkOutList } from '../../helper/dataConstant';

import { NativeModules } from 'react-native';
import { DeviceEventEmitter } from 'react-native';
import { RfidProductProp } from '../../interface/common';
import axios from 'axios';
import { TextInput } from 'react-native-gesture-handler';
import SvgIcons from '../../helper/SvgIcons';

const { TagReadModule } = NativeModules;

const CheckOutScreen = ({ navigation }: any) => {
  const [editModal, setEditModal] = useState<boolean>(false);
  const [tags, setTags] = useState<string[]>([])
  const [products, setProducts] = useState<RfidProductProp[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectProduct, setSelectProduct] = useState<RfidProductProp | null>()
  const [quantity, setQuantity] = useState<number>(0)
  const [searchText, setSearchText] = useState<string>("")

  useEffect(() => {
    TagReadModule.startInventoryTask();
    const sub = DeviceEventEmitter.addListener('ReadTag', (event) => {
      console.log('event', event);
      let tag = event.match(/[0-9A-F]{24}/i)[0];

      // console.log('Read Tag: ', tag);
      if (!tags.includes(tag)) {
        const arr = tags;
        arr.push(tag);
        setTags(arr);
      }
    });

    return () => {
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
  }, [tags]);

  const handleSave = async () => {
    console.log({
      "product_id": selectProduct?.product.id,
      "quantity": quantity
    })
    try {
      const resp = await axios.post(`${BASE_URL}/pms/scan_products?scan_type=checkout`, [
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
      setEditModal(false)

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
          },
        });

      const pro = products.data.map((product: any, index:number) => {
        return {
          product: {
            id: product.id,
            material_desc: product.maker_desc,
            maker_desc: product.material_desc,
            part_no: product.part_no
          },
          rob: 1,
          rfid: tags[index]
        }
      }
      )
      setProducts(pro)

    } catch (error) {
      console.log('error', error)
    }
    finally {
      setIsLoading(false)
    }
  }
  const handleSelect = (item: any) => {
    setSelectProduct(item);
    setEditModal(true);
  }

 

  const renderCheckOutList = ({ item }: any) => {
    return <CheckOutListItem item={item} onPress={() => handleSelect(item)} />;
  };


  return (
    <View style={commonStyles.root}>
      <SearchBox
        value={searchText}
        onChangeText={text => setSearchText(text)}
      />

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="2e2e2e" />
          <Text>Loading...</Text>
        </View>
      ) : <FlatList
        bounces={false}
          data={products}
        renderItem={renderCheckOutList}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={ListFooterComponent}
      />}

      <FAB status={'Confirm'} onPress={() => { }} />
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
              >{selectProduct?.rob ?? 0 - quantity}</Text>
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
};

export default CheckOutScreen;

const styles = StyleSheet.create({
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
