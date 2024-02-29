import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import {DrawerContentScrollView} from '@react-navigation/drawer';

import {
  hp,
  wp,
  fonts,
  icons,
  colors,
  fontSize,
  commonStyles,
} from '../../helper';
import Shadow from './Shadow';
import SvgIcons from '../../helper/SvgIcons';
import {useNavigation} from '@react-navigation/native';

const CustomDrawer = (props: any) => {
  const {goBack} = useNavigation();
  return (
    <View style={styles.drawerContainer}>
      <DrawerContentScrollView {...props} bounces={false}>
        <View style={styles.itemListView}>
          <View style={styles.itemListView}>
            <View style={styles.titleContainer}>
              <TouchableOpacity onPress={() => goBack()} activeOpacity={0.7}>
                <SvgIcons iconName="menuClose" />
              </TouchableOpacity>
              <View style={styles.titleSubContainer}>
                <SvgIcons iconName="pin" />
                <Text style={styles.titleText}>{`Project Narwhal`}</Text>
              </View>
            </View>
            <View style={styles.profileCardView}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {}}
                style={styles.profileView}>
                <Image source={icons.profile} style={styles.profileImage} />
                <Text style={styles.profileText}>{`Your Profile`}</Text>
              </TouchableOpacity>
              <View style={styles.itemContainer}>
                <TouchableOpacity style={styles.itemView} onPress={() => {}}>
                  <View style={styles.iconView}>
                    <SvgIcons iconName="connectivity" />
                  </View>
                  <Text style={styles.itemText}>{`Connectivity`}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemView} onPress={() => {}}>
                  <View style={styles.iconView}>
                    <SvgIcons iconName="deviceInfo" />
                  </View>
                  <Text style={styles.itemText}>{`Device Info`}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemView} onPress={() => {}}>
                  <View style={styles.iconView}>
                    <SvgIcons iconName="setting" />
                  </View>
                  <Text style={styles.itemText}>{`Settings`}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </DrawerContentScrollView>
      <Shadow shadowStyle={styles.shadowStyle}>
        <View style={styles.cardContainer}>
          <ImageBackground
            source={icons.cardBg}
            resizeMode="contain"
            style={styles.imgBgStyle}>
            <View style={commonStyles.flex}>
              <View style={styles.queMarkBtn}>
                <SvgIcons iconName="queMarkBlue" />
              </View>
              <Text style={styles.needHelpText}>{`Need help?`}</Text>
              <Text
                style={styles.checkDocsText}>{`Please check our docs`}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {}}
              activeOpacity={0.7}
              style={styles.docsBtn}>
              <Text style={styles.docsText}>{`DOCUMENTATION`}</Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </Shadow>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },
  itemListView: {
    flex: 1,
  },
  profileImage: {
    width: wp(8.5),
    height: wp(8.5),
  },
  titleContainer: {
    paddingLeft: wp(6),
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp(3),
  },
  titleSubContainer: {
    paddingLeft: wp(5),
  },
  titleText: {
    marginTop: wp(0.5),
    color: colors.black,
    fontSize: fontSize(13),
    fontFamily: fonts.regular,
  },
  profileCardView: {
    padding: wp(5.33),
    marginLeft: wp(4),
    marginRight: wp(8),
    borderRadius: wp(2.6),
    backgroundColor: colors.lightGrey,
  },
  profileView: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  profileText: {
    paddingLeft: wp(5),
    fontSize: fontSize(15),
    color: colors.greenDark,
    fontFamily: fonts.medium,
  },
  itemContainer: {
    marginLeft: wp(6),
  },
  itemView: {
    marginTop: wp(5),
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconView: {
    width: wp(5),
    alignItems: 'center',
  },
  itemText: {
    paddingLeft: wp(2),
    color: colors.greyText,
    fontSize: fontSize(15),
    fontFamily: fonts.medium,
  },
  cardContainer: {
    marginLeft: wp(4),
    marginBottom: wp(6),
  },
  imgBgStyle: {
    width: wp(61),
    height: hp(23),
    padding: wp(5.33),
    paddingVertical: wp(7),
  },
  queMarkBtn: {
    width: wp(8.8),
    height: wp(8.8),
    alignItems: 'center',
    borderRadius: wp(3.5),
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  needHelpText: {
    marginTop: hp(2.3),
    color: colors.white,
    fontSize: fontSize(13),
    fontFamily: fonts.bold,
  },
  checkDocsText: {
    marginTop: wp(0.5),
    color: colors.white,
    fontSize: fontSize(11),
    fontFamily: fonts.regular,
  },
  docsBtn: {
    alignItems: 'center',
    borderRadius: wp(3.2),
    justifyContent: 'center',
    paddingVertical: wp(3.2),
    backgroundColor: colors.white,
  },
  docsText: {
    color: colors.black,
    fontSize: fontSize(10),
    fontFamily: fonts.bold,
  },
  shadowStyle: {
    shadowOffset: {
      width: -3,
      height: 3,
    },
  },
});
