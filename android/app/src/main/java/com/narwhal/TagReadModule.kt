    package com.narwhal

import android.annotation.SuppressLint
import android.os.Handler
import android.os.Looper
import android.os.Message
import android.util.Log
import co.kr.bluebird.sled.Reader
import co.kr.bluebird.sled.SDConsts
import co.kr.bluebird.sled.SDConsts.RFResult
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule

class TagReadModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val tag = "TagReadModule"

    override fun getName() = tag

    @SuppressLint("HandlerLeak")
    private val handler = object : Handler(Looper.getMainLooper()) {
        override fun handleMessage(msg: Message) {
            if (msg.what != SDConsts.Msg.RFMsg) return;
            if (msg.arg1 == SDConsts.RFCmdMsg.INVENTORY) {
                if (msg.arg2 == RFResult.SUCCESS) {
                    if (msg.obj != null && msg.obj is String) {
                        val data = msg.obj as String
                        dispatchEvent(reactContext, "ReadTag", data);
                    }
                }
            }
        }
    }

    @ReactMethod
    fun performInventory(): Boolean {
        val reader = Reader.getReader(currentActivity, handler)
        reader.RF_SetSession(1);
        return reader.RF_PerformInventory(false, false, true) == RFResult.SUCCESS
    }

    @ReactMethod
    fun stopInventory(): Boolean {
        val reader = Reader.getReader(currentActivity, handler)
        return reader.RF_StopInventory() == RFResult.SUCCESS
    }

    fun dispatchEvent(
            reactContext: ReactApplicationContext,
            eventName: String,
            eventData: String
    ) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit(eventName, eventData)
    }

}