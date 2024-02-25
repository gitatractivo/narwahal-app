package com.narwhal

import android.annotation.SuppressLint
import android.os.Handler
import android.os.Looper
import android.os.Message
import android.util.Log
import co.kr.bluebird.sled.Reader
import co.kr.bluebird.sled.SDConsts
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule


class ConnectivityModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val tag = "ConnectivityModule"

    override fun getName() = "ConnectivityModule"
    @SuppressLint("HandlerLeak")
    private val handler = object : Handler(Looper.getMainLooper()) {
        override fun handleMessage(msg: Message) {
            if (msg.what != SDConsts.Msg.SDMsg) return;
            when (msg.arg1) {
                SDConsts.SDCmdMsg.SLED_WAKEUP -> dispatchEvent(reactContext, "Wakeup", msg.arg2)
                SDConsts.SDCmdMsg.SLED_UNKNOWN_DISCONNECTED -> dispatchEvent(reactContext, "Disconnected", 0)
            }
        }
    }

    @ReactMethod
    fun wakeup(): Boolean {
        val reader = Reader.getReader(currentActivity, handler)
        if (!reader.SD_Open()) return false
        return reader.SD_Wakeup().let {
            it == SDConsts.SDResult.SUCCESS || it == SDConsts.SDResult.ALREADY_CONNECTED
        }
    }

    @ReactMethod
    fun connect(): Boolean {
        val reader = Reader.getReader(currentActivity, handler)
        val ret = reader.SD_Connect()
        return ret == SDConsts.SDResult.SUCCESS || ret == SDConsts.SDResult.ALREADY_CONNECTED
    }


    @ReactMethod
    fun disconnect(): Boolean = Reader.getReader(currentActivity, handler).SD_Disconnect().let {
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