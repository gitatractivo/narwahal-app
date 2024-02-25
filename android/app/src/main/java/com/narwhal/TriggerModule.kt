package com.narwhal

import android.os.Handler
import android.os.Looper
import android.os.Message
import android.util.Log
import co.kr.bluebird.sled.Reader
import co.kr.bluebird.sled.SDConsts
import com.facebook.react.bridge.Promise
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
            Log.d(tag, msg.toString())

        }
    }

    @ReactMethod
    fun startListeningForTrigger(promise: Promise) {
        Log.d(tag, "Starting trigger listening")
        dispatchEvents = true
        Reader.getReader(currentActivity, handler).also {
            Log.d(tag, "Reader state: $it")
        }
    }

    @ReactMethod
    fun stopListeningForTrigger() {
        Log.d(tag, "Stopping trigger listening")
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