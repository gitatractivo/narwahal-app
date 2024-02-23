package com.narwhal

import android.annotation.SuppressLint
import android.os.Handler
import android.os.Message
import co.kr.bluebird.sled.Reader
import co.kr.bluebird.sled.SDConsts
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.modules.core.DeviceEventManagerModule

class TagReadModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "TagReadModule"

    @SuppressLint("HandlerLeak")
    private val handler = object : Handler() {
        override fun handleMessage(msg: Message) {
            if (msg.what != SDConsts.Msg.RFMsg) return;
            if (msg.arg1 != SDConsts.RFCmdMsg.INVENTORY || msg.arg1 != SDConsts.RFCmdMsg.READ) return;
            if (msg.arg2 == SDConsts.RFResult.SUCCESS) {
                if (msg.obj != null && msg.obj is String) {
                    val data = msg.obj as String
                    dispatchEvent(reactContext, "ReadTag", data);
                }
            }
        }
    }
    private val reader = Reader.getReader(currentActivity, handler);

    fun dispatchEvent(
            reactContext: ReactApplicationContext,
            eventName: String,
            eventData: String
    ) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit(eventName, eventData)
    }

}