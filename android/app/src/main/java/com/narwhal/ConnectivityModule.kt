package com.narwhal

import android.annotation.SuppressLint
import android.os.Handler
import android.os.Message
import co.kr.bluebird.sled.Reader
import co.kr.bluebird.sled.SDConsts
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule


class ConnectivityModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName() = "ConnectivityModule"
    @SuppressLint("HandlerLeak")
    private val handler = object : Handler() {
        override fun handleMessage(msg: Message) {
            if (msg.what != SDConsts.Msg.SDMsg) return;
            when (msg.arg1) {
                SDConsts.SDCmdMsg.SLED_WAKEUP -> dispatchEvent(reactContext, "Wakeup", msg.arg2)
                SDConsts.SDCmdMsg.SLED_UNKNOWN_DISCONNECTED -> dispatchEvent(reactContext, "Disconnected", 0)
            }
        }
    }
    private val reader = Reader.getReader(currentActivity, handler);

    @ReactMethod
    fun connect(): Boolean = reader.SD_Connect().let {
        it == SDConsts.SDResult.SUCCESS || it == SDConsts.SDResult.ALREADY_CONNECTED
    }


    @ReactMethod
    fun disconnect(): Boolean = reader.SD_Disconnect().let {
        it == SDConsts.SDConnectState.DISCONNECTED ||
                it == SDConsts.SDConnectState.ALREADY_DISCONNECTED ||
                it == SDConsts.SDConnectState.ACCESS_TIMEOUT
    }

    fun dispatchEvent(
            reactContext: ReactApplicationContext,
            eventName: String,
            eventData: Int
    ) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit(eventName, eventData)
    }

}