package com.narwhal

import android.annotation.SuppressLint
import android.os.Handler
import android.os.Message
import android.util.Log
import co.kr.bluebird.sled.Reader
import co.kr.bluebird.sled.SDConsts
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.modules.core.DeviceEventManagerModule

class LocateModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "TagLocateModule"

    @SuppressLint("HandlerLeak")
    private val handler = object : Handler() {
        override fun handleMessage(msg: Message) {
            System.out.println("Message received");
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
    private val reader = Reader.getReader(currentActivity, handler);
    init {
        Log.d("LocateModule", "Loaded reader: " + reader)
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