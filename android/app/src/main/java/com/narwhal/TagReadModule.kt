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

    private val TAG = "TagReadModule"

    override fun getName() = TAG

    @SuppressLint("HandlerLeak")
    private val handler = object : Handler(Looper.getMainLooper()) {
        override fun handleMessage(msg: Message) {
            Log.d(TAG, msg.toString());
            if (msg.what != SDConsts.Msg.RFMsg) return;
            if (msg.arg1 != SDConsts.RFCmdMsg.INVENTORY || msg.arg1 != SDConsts.RFCmdMsg.READ) return;
            if (msg.arg2 == SDConsts.RFResult.SUCCESS) {
                if (msg.obj != null && msg.obj is String) {
                    val data = msg.obj as String
                    Log.d("$TAG data", data);
                    dispatchEvent(reactContext, "ReadTag", data);
                }
            }
        }
    }

    @ReactMethod
    fun startTagReader() {
        Log.d(TAG, "Starting tag reading")
        val reader = Reader.getReader(currentActivity, handler)
        reader.RF_SetSession(1);
        val ret = reader.RF_PerformInventory(false, false, true)
        Log.d("$TAG ret: ", ret.toString())
        Log.d("$TAG reader: ", reader.toString())
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