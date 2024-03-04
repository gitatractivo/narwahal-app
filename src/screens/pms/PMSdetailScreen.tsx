import React, {FC, useEffect, useState} from 'react';
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
import {commonStyles, BASE_URL, ListFooterComponent} from '../../helper';
import {DetailDataProps, PMSdetailScreenProps} from '../../interface/common';
import {hp, wp, fonts, isIos, colors, fontSize} from '../../helper';
import axios from 'axios';
import PMSDetailBottomSheetView from '../../components/common/PMSDetailBottomSheetView.tsx';

const PMSdetailScreen: FC<PMSdetailScreenProps> = ({route}) => {
  const id = route?.params?.id;
  const description = route?.params?.description;
  const status = route?.params?.status;

  const [searchText, setSearchText] = useState<string>('');
  const [editModal, setEditModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [detailData, setdetailData] = useState<DetailDataProps[]>();
  const [tagToTrack, setTagToTrack] = useState('');

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
      let status_update = 'completed';
      if (status === 'planning') {
        status_update = 'in_progress';
      }
      console.log(
        `${BASE_URL}/pms/jobs/status?job_id=${id}&status_update=${status_update}`,
      );
      const resp = await axios.put(
        `${BASE_URL}/pms/jobs/status?job_id=${id}&status_update=${status_update}`,
      );

      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRefresh = () => {
    setRefreshing(true);
    getData();
  };

  const renderDetail = ({item}: any) => {
    return <DetailListItem item={item} onPress={() => {
      setEditModal(true);
      console.log(item);
      setTagToTrack(item.rfid);
      console.log('Set tag to track: ', item.rfid);
    }} />;
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
      ) : (
        <FlatList
          bounces={false}
          data={detailData}
          renderItem={renderDetail}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={ListFooterComponent}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      )}

      <FAB status={status as string} onPress={() => {
        handleStatusChange()
      }} />
      <BottomSheet
        isVisible={editModal}
        closeSheet={() => setEditModal(false)}
      >
        <PMSDetailBottomSheetView setEditModal={setEditModal} tagToTrack={tagToTrack} />
      </BottomSheet>

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
    justifyContent: 'center',
    alignItems: 'center',
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
});
