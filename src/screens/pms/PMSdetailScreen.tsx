import React, {FC, useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity, DeviceEventEmitter,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {
  FAB,
  SearchBox,
  BottomSheet,
  CommonButton,
  PMSCompletedListItem,
  TrackingPopup,
  PMSDetailListItem,
  FABprogressive
} from '../../components';
import SvgIcons from '../../helper/SvgIcons';
import {commonStyles, BASE_URL, ListFooterComponent, detailData} from '../../helper';
import {DetailDataProps, PMSdetailScreenProps} from '../../interface/common';
import {hp, wp, fonts, isIos, colors, fontSize} from '../../helper';
import axios from 'axios';
import PMSDetailBottomSheetView from '../../components/common/PMSDetailBottomSheetView.tsx';

import {NativeModules} from 'react-native';

const { TagReadModule } = NativeModules;


const PMSdetailScreen: FC<PMSdetailScreenProps> = ({route}) => {
  const id = route?.params?.id;
  const description = route?.params?.description;
  const status = route?.params?.status;

  const [searchText, setSearchText] = useState<string>('');
  const [editModal, setEditModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [detailData, setdetailData] = useState<DetailDataProps[]>();
  const [triggerPressed, setTriggerPressed] = useState(false);

  const [currentTags, setCurrentTags] = useState<string[]>([]);
  const productScanned = useMemo(() => {
    let scanned = 0;
    detailData?.forEach((item) => {
      if (currentTags.includes(item?.rfid)) {
        scanned++;
      }
    });
    return scanned;
  }, [currentTags, detailData]);

  const PMSList = React.memo(() => {

    console.log('Rerendering Started 2');

    return <FlatList
        bounces={false}
        data={detailData}
        renderItem={renderDetail}
        keyExtractor={(_item, index) => index.toString()}
        ListFooterComponent={ListFooterComponent}
        refreshing={refreshing}
        onRefresh={handleRefresh}
    />;
    //@ts-ignore
  }, (prevProps, nextProps) => { return prevProps?.detailData == nextProps?.detailData });

  const getData = async () => {
    try {
      console.log(`${BASE_URL}/pms/products?job_id=${id}`);
      const resp = await axios.get(`${BASE_URL}/pms/products?job_id=${id}`);
      console.log("gettingData")
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
  }, []);

  useEffect(() => {
    console.log('Adding listeners');
    const listener1 = DeviceEventEmitter.addListener('TriggerPress', () => {
      console.log('Trigger Pressed');
      setTriggerPressed(true);
    });
    const listener2 = DeviceEventEmitter.addListener('TriggerRelease', () => {
      console.log('Trigger Released');
      setTriggerPressed(false);
    });
    const listener3 = DeviceEventEmitter.addListener('ReadTag', (event) => {
      const tagId = event.split(';')[0];
      if (!currentTags.includes(tagId)) {
        setCurrentTags([...currentTags, tagId]);
      }
    });
    return () => {
      listener1.remove();
      listener2.remove();
      listener3.remove();
    };
  }, []);

  // useEffect(() => {
  //   TagReadModule.startInventoryTask();
  //   return () => {
  //     TagReadModule.stopInventoryTask();
  //   };
  // }, []);

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
    if(status === 'completed') {
      return <PMSCompletedListItem item={item} onPress={() => {
        setEditModal(true);
        // console.log(item);
        // setTagToTrack(item?.rfid);
        // console.log('Set tag to track: ', item.rfid);
      }} />;
    } else {
      return <PMSDetailListItem item={item} onSubListPress={() => {
        setEditModal(true);
        // console.log(item);
        // setTagToTrack(item?.rfid);
        // console.log('Set tag to track: ', item.rfid);
      }} />;
    }
  };

  return (
    <View style={commonStyles.root}>
      {console.log('Rerendering Started 1')}
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

      <TouchableOpacity activeOpacity={0.8} onPress={()=>{}} style={styles.triggerView}>
        <SvgIcons iconName='barcodeReader'/>
        <Text style={styles.triggerText}>{triggerPressed ? 'Scanning...' : 'Press the trigger to start scanning!'}</Text>
      </TouchableOpacity>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="2e2e2e" />
          <Text>Loading...</Text>
        </View>
      ) : (
          <PMSList />
      )}

      {status !== 'completed' && 
        (status === 'planning') ? 
        <FABprogressive 
          status={'Start'} 
          onPress={() => {
          handleStatusChange()
          }}
          disable={false}
          partial={false}
        />
        : <FAB status={'Complete'} onPress={() => {
          handleStatusChange()
        }} />
      }

      <TrackingPopup 
        pms
        isVisible={editModal}
        closeSheet={() => setEditModal(false)}
      />

      {/* <BottomSheet
        isVisible={editModal}
        closeSheet={() => setEditModal(false)}
      >
        <PMSDetailBottomSheetView setEditModal={setEditModal} tagToTrack={tagToTrack} />
      </BottomSheet> */}

      <SafeAreaView />
      {console.log('Rerendering Ended 1')}
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
  triggerView: {
    margin: wp(1), 
    borderWidth: wp(0.2),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: wp(1.6),
    justifyContent: 'center',
    paddingVertical: wp(1.5),
    borderColor: colors.primary,
    backgroundColor: colors.primaryMedium,
  },
  triggerText: {
    marginLeft: wp(3),
    color: colors.primary,
    fontSize: fontSize(14),
    fontFamily: fonts.medium,
  },
});
