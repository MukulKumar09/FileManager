package com.delete2
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.os.Environment
import android.provider.Settings
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate


class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "Delete2"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

  override fun onCreate(savedInstanceState: Bundle?) {
     super.onCreate(null)

     if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R && 
!Environment.isExternalStorageManager()) {
       val intent = 
   Intent(Settings.ACTION_MANAGE_APP_ALL_FILES_ACCESS_PERMISSION)
       val uri = Uri.fromParts("package", packageName, null)
       intent.data = uri
       startActivity(intent)
     }
   }

}
