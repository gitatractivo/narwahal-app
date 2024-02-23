import { NativeModules, DeviceEventEmitter } from 'react-native';

const { LocateModule } = NativeModules;

const addEventListener = (eventName, callback) => {
    DeviceEventEmitter.addListener(eventName, callback);
};

const removeEventListener = (eventName, callback) => {
    DeviceEventEmitter.removeListener(eventName, callback);
};

const dispatchEvent = (eventName, eventData) => {
    LocateModule.dispatchEvent(eventName, eventData);
};

export { addEventListener, removeEventListener, dispatchEvent };