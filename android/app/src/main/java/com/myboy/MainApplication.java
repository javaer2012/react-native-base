package com.myboy;

import android.app.Application;

import com.facebook.react.ReactApplication;
import cn.reactnative.modules.update.UpdatePackage;
import com.imagepicker.ImagePickerPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.BV.LinearGradient.LinearGradientPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

import cn.reactnative.modules.update.UpdateContext;
import com.reactnativecomponent.barcode.RCTCapturePackage;

public class MainApplication extends Application implements ReactApplication {

  private  ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected String getJSBundleFile() {
      return UpdateContext.getBundleUrl(MainApplication.this);
    }
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new UpdatePackage(),
            new ImagePickerPackage(),
            new RNDeviceInfo(),
            new LinearGradientPackage(),
            new RCTCameraPackage(),
            new RCTCapturePackage()

      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  //添加以下代码
  public void setReactNativeHost(ReactNativeHost reactNativeHost) {
    mReactNativeHost = reactNativeHost;
  }

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
