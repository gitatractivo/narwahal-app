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

class LocateModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val tag = "LocateModule"

    override fun getName() = tag

    private var locating: Boolean = false
    private var triggerHeld: Boolean = false
    private var epc: String = ""

    @SuppressLint("HandlerLeak")
    private val handler = object : Handler(Looper.getMainLooper()) {
        override fun handleMessage(msg: Message) {
            triggerChecker(msg, reactContext)
            if (!triggerHeld) return
            if (msg.what != SDConsts.Msg.RFMsg) return;
            if (msg.arg1 != SDConsts.RFCmdMsg.LOCATE) return;
            if (msg.arg2 == RFResult.SUCCESS) {
                if (msg.obj != null && msg.obj is Int) {
                    val data = msg.obj as Int
                    dispatchEvent(reactContext, "LocateTag", data);
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
            if (locating) {
                (Reader.getReader(currentActivity, handler).RF_PerformInventoryForLocating(epc) == RFResult.SUCCESS).let {
                    Log.d(tag, "PerformLocate result: $it")
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
    fun startLocatingTask(epc: String) {
        Log.d(tag, "Attempting start locate")
        locating = true
        this.epc = epc
        Reader.getReader(currentActivity, handler)
    }

    @ReactMethod
    fun stopLocatingTask(): Boolean {
        locating = false
        return Reader.getReader(currentActivity, handler).RF_StopInventory() == RFResult.SUCCESS
    }

    @ReactMethod
    fun dispatchEvent(
            reactContext: ReactApplicationContext,
            eventName: String,
            eventData: Int?
    ) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit(eventName, eventData)
    }

}