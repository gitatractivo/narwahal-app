package com.narwhal

import android.view.View
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ReactShadowNode
import com.facebook.react.uimanager.ViewManager

class MyModules: ReactPackage {
    override fun createNativeModules(p0: ReactApplicationContext): MutableList<NativeModule> =
            listOf(LocateModule(p0), ConnectivityModule(p0), TagReadModule(p0), TriggerModule(p0)).toMutableList()


    override fun createViewManagers(p0: ReactApplicationContext): MutableList<ViewManager<View, ReactShadowNode<*>>> = mutableListOf()
}