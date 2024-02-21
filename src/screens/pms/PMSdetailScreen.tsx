import React, {FC, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import {
  FAB,
  SearchBox,
  BottomSheet,
  CommonButton,
  DetailListItem,
} from '../../components';
import SvgIcons from '../../helper/SvgIcons';
import {commonStyles, detailData} from '../../helper';
import {PMSdetailScreenProps} from '../../interface/common';
import {hp, wp, fonts, isIos, colors, fontSize} from '../../helper';

const PMSdetailScreen: FC<PMSdetailScreenProps> = ({route}) => {
  const title = route?.params?.title;
  const desc = route?.params?.desc;

  const [searchText, setSearchText] = useState<string>('');
  const [editModal, setEditModal] = useState<boolean>(false);

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
        <Text numberOfLines={1} style={styles.titleText}>
          {title}
        </Text>
        <Text numberOfLines={1} style={styles.descText}>
          {desc}
        </Text>
      </View>

      <FlatList
        bounces={false}
        data={detailData}
        renderItem={renderDetail}
        keyExtractor={item => item?.id?.toString()}
        contentContainerStyle={commonStyles.contentContainerStyle}
      />

      <FAB onPress={() => {}} />

      <BottomSheet
        isVisible={editModal}
        closeSheet={() => setEditModal(false)}
        sheetBody={
          <>
            <View style={styles.modalTitleView}>
              <SvgIcons iconName="target" />
              <Text style={styles.modalTitleText}>{`Tracking`}</Text>
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
    padding: wp(7),
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
