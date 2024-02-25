import {Text, TouchableOpacity, View} from "react-native";
import {NativeModules} from "react-native";
import { DeviceEventEmitter } from 'react-native';

const { ConnectivityModule, TagReadModule } = NativeModules;

const ConnectScreen = () => {
    DeviceEventEmitter.addListener('Wakeup', (event) => {
        if (event === 0) {
            ConnectivityModule.connect();
        }
    });
    return (
        <View style={{flex: 1, justifyContent: 'space-between', padding: 50}}>
            <TouchableOpacity onPress={(event) => {
                ConnectivityModule.wakeup();
                return event;
            }}>
            <View>
                <Text>Connect</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={(event) => {
                TagReadModule.startTagReader();
                return event;
            }}>
                <View>
                    <Text>TagRead</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default ConnectScreen;