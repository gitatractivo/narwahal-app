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

class LocateModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "TagLocateModule"

    @SuppressLint("HandlerLeak")
    private val handler = object : Handler(Looper.getMainLooper()) {
        override fun handleMessage(msg: Message) {
            Log.d("LocateModule", "Received message: " + msg.what + " " + msg.arg1 + " " + msg.arg2 + " " + msg.obj)
            if (msg.what != SDConsts.Msg.RFMsg) return;
            if (msg.arg1 != SDConsts.RFCmdMsg.LOCATE) return;
            if (msg.arg2 == SDConsts.RFResult.SUCCESS) {
                if (msg.obj != null && msg.obj is Int) {
                    val data = msg.obj as Int
                    dispatchEvent(reactContext, "LocateTag", data);
                }
            }
        }
    }

    init {
        val reader = Reader.getReader(currentActivity, handler);
        Log.d("LocateModule", "Loaded reader: " + reader)
    }

    @ReactMethod
    fun dispatchEvent(
            reactContext: ReactApplicationContext,
            eventName: String,
            eventData: Int
    ) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit(eventName, eventData)
    }

}