import {StyleSheet, Text, TextInput, View} from "react-native";
import SvgIcons from "../../helper/SvgIcons.tsx";
import {colors, fonts, fontSize, hp, isIos, wp} from "../../helper";
import LinearGradient from "react-native-linear-gradient";
import {CommonButton} from "../index.ts";
import React, {useEffect, useState} from "react";
import {NativeModules} from 'react-native';
import { DeviceEventEmitter } from 'react-native';

const { LocateModule } = NativeModules;

const PMSDetailBottomSheetView = ({setEditModal}) => {

    const [tagToLocate, setTagToLocate] = useState('E2801191A5020060349CB11A');
    const [strength, setStrength] = useState(0);
    const [triggerPressed, setTriggerPressed] = useState(false);

    useEffect(() => {
        const listener1 = DeviceEventEmitter.addListener('TriggerPress', () => {
            console.log('Trigger Pressed');
            setTriggerPressed(true);
        });
        const listener2 = DeviceEventEmitter.addListener('TriggerRelease', () => {
            console.log('Trigger Released');
            setTriggerPressed(false);
        });
        const listener3 = DeviceEventEmitter.addListener('LocateTag', (event) => {
            setStrength(event);
        });
        return () => {
            listener1.remove();
            listener2.remove();
            listener3.remove();
        };
    }, []);

    useEffect(() => {
        console.log("Starting locate");
        LocateModule.startLocatingTask(tagToLocate);
        return () => {
            LocateModule.stopLocatingTask();
        };
    }, [tagToLocate]);


    return <>
        <View style={styles.modalMainBox}>
            <View style={[
                styles.modalTitleView,
            ]}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <SvgIcons iconName="target" iconColor={triggerPressed ? 'blue' : 'red'} iconBorderColor={triggerPressed  ? 'blue' : 'red'} />
                    <Text style={styles.modalTitleText}>{triggerPressed ? 'Tracking' : 'Stopped'}</Text>
                </View>
                <View style={{paddingLeft: wp(4), flex: 2}}>
                    <LinearGradient
                        colors={['#F9A9A7', '#C4BDA5', '#92D0A2']}
                        start={{x: 0, y: 0}}
                        end={{x: strength / 100, y: 0}}
                        style={{
                            width: wp(((strength  / 100) * 54)),
                            height: hp(1.5),
                            borderRadius: wp(100),
                        }}
                    />
                </View>
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

export default PMSDetailBottomSheetView;

const styles = StyleSheet.create({
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
})