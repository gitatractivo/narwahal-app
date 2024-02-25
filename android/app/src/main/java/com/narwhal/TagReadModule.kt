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

class TagReadModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val tag = "TagReadModule"

    override fun getName() = tag

    @SuppressLint("HandlerLeak")
    private val handler = object : Handler(Looper.getMainLooper()) {
        override fun handleMessage(msg: Message) {
            if (msg.what != SDConsts.Msg.RFMsg) return;
            if (msg.arg1 == SDConsts.RFCmdMsg.INVENTORY) {
                if (msg.arg2 == SDConsts.RFResult.SUCCESS) {
                    if (msg.obj != null && msg.obj is String) {
                        val data = msg.obj as String
                        dispatchEvent(reactContext, "ReadTag", data);
                    }
                }
            } else if (msg.arg1 == SDConsts.RFCmdMsg.STOP_INVENTORY) {
                existingReaderInstance?.RF_StopInventory()
                existingReaderInstance = null
            }

        }
    }

    private var existingReaderInstance: Reader? = null

    @ReactMethod
    fun startTagReader() {
        Log.d(tag, "Starting tag reading")
        existingReaderInstance = Reader.getReader(currentActivity, handler)!!
        existingReaderInstance?.RF_SetSession(1);
        val ret = existingReaderInstance?.RF_PerformInventory(false, false, true)
        Log.d("$tag ret: ", ret.toString())
        Log.d("$tag reader: ", existingReaderInstance.toString())
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