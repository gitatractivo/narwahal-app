package com.narwhal

import android.os.Handler
import android.os.Looper
import android.os.Message
import co.kr.bluebird.sled.Reader
import co.kr.bluebird.sled.SDConsts
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule

class TriggerModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val tag = "TriggerModule"

    override fun getName() = tag

    private var dispatchEvents = true

    @SuppressWarnings("HandlerLeak")
    private val handler = object : Handler(Looper.getMainLooper()) {
        override fun handleMessage(msg: Message) {
            if (dispatchEvents.not()) return
            if (msg.what != SDConsts.Msg.SDMsg) return
            if (msg.arg1 == SDConsts.SDCmdMsg.TRIGGER_PRESSED) {
                dispatchEvent(reactContext, "TriggerPress", null)
            } else if (msg.arg1 == SDConsts.SDCmdMsg.TRIGGER_RELEASED) {
                dispatchEvent(reactContext, "TriggerRelease", null)
            }
        }
    }

    @ReactMethod
    fun startListeningForTrigger() {
        Reader.getReader(currentActivity, handler)
        dispatchEvents = true
    }

    @ReactMethod
    fun stopListeningForTrigger() {
        dispatchEvents = false
    }

    fun dispatchEvent(
            reactContext: ReactApplicationContext,
            eventName: String,
            eventData: String?
    ) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit(eventName, eventData)
    }

}