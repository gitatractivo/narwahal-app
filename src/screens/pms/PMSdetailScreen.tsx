import React, { FC, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  StatusBar,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {
  FAB,
  SearchBox,
  BottomSheet,
  CommonButton,
  DetailListItem,
} from '../../components';
import SvgIcons from '../../helper/SvgIcons';
import { commonStyles, BASE_URL} from '../../helper';
import {DetailDataProps, PMSdetailScreenProps} from '../../interface/common';
import {hp, wp, fonts, isIos, colors, fontSize} from '../../helper';
import axios from 'axios';

const PMSdetailScreen: FC<PMSdetailScreenProps> = ({route}) => {
  const id = route?.params?.id;
  const description = route?.params?.description;
  const status = route?.params?.status;

  const [searchText, setSearchText] = useState<string>('');
  const [editModal, setEditModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [detailData, setdetailData] = useState<DetailDataProps[]>();


  const getData = async () => {
    try {
      console.log(`${BASE_URL}/pms/products?job_id=${id}`);
      const resp = await axios.get(`${BASE_URL}/pms/products?job_id=${id}`);
      console.log(resp);
      setdetailData(resp.data);
    } catch (error) {
      console.log(error);

    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);


  const handleStatusChange = async () => {
    try {
      let status_update = "completed";
      if (status === "planning") {
        status_update = "in_progress";
      }
      console.log(`${BASE_URL}/pms/jobs/status?job_id=${id}&status_update=${status_update}`)
      const resp = await axios.put(`${BASE_URL}/pms/jobs/status?job_id=${id}&status_update=${status_update}`);

      console.log(resp)
    } catch (error) {
      console.log(error)
    }

  }
  const handleRefresh = () => {
    setRefreshing(true);
    getData();

  }

  const renderDetail = ({item}: any) => {
    return <DetailListItem item={item} onPress={() => setEditModal(true)} />;
  };

  return (
    <View style={commonStyles.root}>
      <SafeAreaView />
      <SearchBox
        value={searchText}
        onChangeText={text => setSearchText(text)}
      />
      <View style={styles.titleView}>
        <Text numberOfLines={1} style={styles.descText}>
          {description}
        </Text>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="2e2e2e" />
          <Text>Loading...</Text>
        </View>
      ) : (<FlatList
        bounces={false}
        data={detailData}
        renderItem={renderDetail}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={commonStyles.contentContainerStyle} refreshing={refreshing}
        onRefresh={handleRefresh}
      />)}

      <FAB status={status as string} onPress={() => {
        handleStatusChange()
      }} />
      <BottomSheet
        isVisible={editModal}
        closeSheet={() => setEditModal(false)}
        sheetBody={
          <>
            <View
              style={[
                styles.modalTitleView,
                {justifyContent: 'space-between'},
              ]}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <SvgIcons iconName="target" />
                <Text style={styles.modalTitleText}>{`Tracking`}</Text>
              </View>
              <View style={{paddingRight: wp(4)}}>
                <LinearGradient
                  colors={['#F9A9A7', '#C4BDA5', '#92D0A2']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={{
                    width: wp(54),
                    height: hp(1.5),
                    borderRadius: wp(100),
                  }}
                />
              </View>
            </View>
            <View style={styles.modalSubTitleView}>
              <SvgIcons iconName="pencil" />
              <Text style={styles.subTitleText}>{`Edit`}</Text>
            </View>
            <View style={styles.modalInputView}>
              <Text style={styles.modalLabelText}>{`Package Qty:`}</Text>
              <View style={styles.modalInputContainer}>
                <TextInput
                  style={styles.modalInputStyle}
                  keyboardType="numeric"
                />
              </View>
            </View>
            <View style={styles.modalInputView}>
              <Text style={styles.modalLabelText}>{`Checkout Qty:`}</Text>
              <View style={styles.modalInputContainer}>
                <TextInput
                  style={styles.modalInputStyle}
                  keyboardType="numeric"
                />
              </View>
            </View>
            <View style={styles.modalButtonContainer}>
              <CommonButton
                title={'Save'}
                onPress={() => setEditModal(false)}
              />
            </View>
          </>
        }
      />

      <SafeAreaView />
    </View>
  );
};

export default PMSdetailScreen;

const styles = StyleSheet.create({
  titleView: {
    paddingVertical: wp(3),
    paddingHorizontal: wp(5),
    backgroundColor: colors.primaryxLight,
  },
  loadingContainer: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    justifyContent: "center",
    alignItems: "center"
  },
  titleText: {
    color: colors.black,
    fontSize: fontSize(16),
    fontFamily: fonts.medium,
  },
  descText: {
    marginTop: wp(2),
    color: colors.greyText,
    fontSize: fontSize(12),
    fontFamily: fonts.regular,
  },
  uniqText: {
    marginTop: hp(1),
    marginRight: wp(3),
    color: colors.darkGrey,
    fontSize: fontSize(13),
    fontFamily: fonts.regular,
  },
  qtyText: {
    marginTop: hp(1),
    color: colors.black,
    fontSize: fontSize(15),
    fontFamily: fonts.medium,
  },
  bottomSheetView: {
    alignItems: 'center',
    borderTopLeftRadius: wp(4),
    borderTopRightRadius: wp(4),
    backgroundColor: colors.white,
  },
  greenDot: {
    top: wp(3),
    width: wp(3),
    right: wp(3),
    height: wp(3),
    position: 'absolute',
    borderRadius: wp(100),
    backgroundColor: colors.green,
  },
  modalTitleView: {
    width: '100%',
    paddingTop: wp(7),
    paddingLeft: wp(7),
    paddingBottom: wp(7),
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    borderBottomWidth: wp(0.2),
    borderBlockColor: colors.grey,
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
