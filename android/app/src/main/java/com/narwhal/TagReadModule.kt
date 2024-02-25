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

    private var scanning: Boolean = false
    private var triggerHeld: Boolean = false

    @SuppressLint("HandlerLeak")
    private val handler = object : Handler(Looper.getMainLooper()) {
        override fun handleMessage(msg: Message) {
            triggerChecker(msg, reactContext)
            if (!triggerHeld) return
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
    private fun triggerChecker(msg: Message, reactContext: ReactApplicationContext) {
        if (msg.what != SDConsts.Msg.SDMsg) return
        if (msg.arg1 == SDConsts.SDCmdMsg.TRIGGER_PRESSED) {
            Log.d(tag, "Trigger pressed")
            triggerHeld = true
            dispatchEvent(reactContext, "TriggerPress", null)
            if (scanning) {
                (Reader.getReader(currentActivity, handler).RF_PerformInventory(false, false, true) == RFResult.SUCCESS).let {
                    Log.d(tag, "PerformInventory result: $it")
                }
            }
        } else if (msg.arg1 == SDConsts.SDCmdMsg.TRIGGER_RELEASED) {
            Log.d(tag, "Trigger released")
            triggerHeld = false
            dispatchEvent(reactContext, "TriggerRelease", null)
            Reader.getReader(currentActivity, handler).RF_StopInventory()
        }
    }

    @ReactMethod
    fun startInventoryTask() {
        Log.d(tag, "Attempting tag read task")
        scanning = true
        Reader.getReader(currentActivity, handler).let {
            it.RF_SetSession(1)
            Log.d(tag, "Start inventory result: $it")
        }
    }

    @ReactMethod
    fun stopInventoryTask() {
        Log.d(tag, "Attempting stop tag read task")
        scanning = false
        Reader.getReader(currentActivity, handler).RF_StopInventory().let {
            Log.d(tag, "Stop Inventory result: ${it == RFResult.SUCCESS}")
        }
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