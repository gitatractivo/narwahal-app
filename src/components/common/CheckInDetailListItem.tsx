import React, { useState } from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {colors, fontSize, fonts, hp, wp} from '../../helper';
import Shadow from './Shadow';

const CheckInDetailListItem = ({item, onPress}: any) => {
  console.log('item=======',item);
  const [isDeleteBtn, setIsDeleteBtn] = useState<boolean>(false)
  
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      onLongPress={()=>setIsDeleteBtn(true)}
      style={styles.container}>
      <Text style={styles.titleText}>{item?.title}</Text>
      <Text style={styles.descText}>{item?.desc}</Text>
      <View style={styles.tagContainer}>
        <View
          style={[
            styles.tagView,
            {
              backgroundColor:
                item?.tag == 'Reconditioned'
                  ? colors.orangexLight
                  : colors.greenxLight,
              borderColor:
                item?.tag == 'Reconditioned'
                  ? colors.orangeLight
                  : colors.greenLight,
            },
          ]}>
          <Text
            style={[
              styles.tagText,
              {
                color:
                  item?.tag == 'Reconditioned' ? colors.orange : colors.green,
              },
            ]}>
            {item?.tag}
          </Text>
        </View>
        <Text style={styles.uniqText}>{item?.uniqueID}</Text>
      </View>

      <View style={styles.qtyContainer}>
        <Text style={styles.uniqText}>{`ROB:`}</Text>
        <Text style={styles.qtyText}>{item?.rob}</Text>
        <Text
          style={[styles.uniqText, styles.marginLeft]}>{`Scanned Qty:`}</Text>
        <Text style={styles.qtyText}>{item?.scannedQty}</Text>
        <Text
          style={[styles.uniqText, styles.marginLeft]}>{`Checkin Qty:`}</Text>
        <Text style={styles.qtyText}>{item?.checkinQty}</Text>
      </View>

      {isDeleteBtn && 
      <Shadow>
      <TouchableOpacity onPress={()=>setIsDeleteBtn(false)} style={{width:150, 
        height:50,
        position:'absolute', 
        backgroundColor:colors.white, 
        bottom:-20, 
        left:'50%',
        borderRadius: wp(2.1), 
        borderColor: colors.redLight,
        borderWidth:wp(0.2),
        alignItems:'center',
        justifyContent:'center'
        }}>
            <Text style={{color:colors.red, fontSize:fontSize(14), fontFamily: fonts.medium}}>{`Remove`}</Text>
        </TouchableOpacity>
        </Shadow>
        }
    </TouchableOpacity>
  );
};

export default CheckInDetailListItem;

const styles = StyleSheet.create({
  container: {
    padding: wp(5.5),
    borderBottomWidth: wp(0.2),
    borderBottomColor: colors.grey,
  },
  titleText: {
    color: colors.black,
    fontSize: fontSize(15),
    fontFamily: fonts.medium,
  },
  descText: {
    color: colors.darkGrey,
    fontSize: fontSize(14),
    fontFamily: fonts.medium,
    marginVertical: wp(0.5),
  },
  tagContainer: {
    marginTop: wp(1.5),
    alignItems: 'center',
    flexDirection: 'row',
  },
  tagView: {
    borderWidth: wp(0.2),
    marginRight: wp(4.5),
    paddingVertical: wp(1),
    borderRadius: wp(1.33),
    paddingHorizontal: wp(3),
  },
  tagText: {
    color: colors.orange,
    fontSize: fontSize(12),
    fontFamily: fonts.medium,
  },
  qtyContainer: {
    marginTop: hp(3),
    alignItems: 'center',
    flexDirection: 'row',
  },
  qtySubView: {
    marginLeft: wp(8),
  },
  uniqText: {
    marginRight: wp(3),
    color: colors.darkGrey,
    fontSize: fontSize(13),
    fontFamily: fonts.regular,
  },
  qtyText: {
    color: colors.black,
    fontSize: fontSize(15),
    fontFamily: fonts.medium,
  },
  marginLeft: {
    marginLeft: wp(3),
  },
});
