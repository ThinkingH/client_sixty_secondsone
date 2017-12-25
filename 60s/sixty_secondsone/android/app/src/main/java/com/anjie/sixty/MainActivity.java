package com.anjie.sixty;

import android.content.Intent;
import android.os.Bundle;
import android.os.PersistableBundle;
import android.support.annotation.Nullable;
import android.util.Log;

import com.anjie.sixty.invokenative.RNUMConfigure;
import com.anjie.sixty.invokenative.ShareModule;
import com.facebook.react.ReactActivity;
import com.facebook.soloader.SoLoader;
import com.umeng.analytics.MobclickAgent;
import com.umeng.commonsdk.UMConfigure;
import com.umeng.socialize.PlatformConfig;
import com.umeng.socialize.UMShareAPI;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "sixty_seconds";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        SoLoader.init(this,false);
        RNUMConfigure.init(this, "59ec974af43e4842bc00024c", "Umeng", UMConfigure.DEVICE_TYPE_PHONE, null);


        ShareModule.initSocialSDK(this);
        //PushModule.initPushSDK(this);
        //MobclickAgent.setSessionContinueMillis(1000);
        //MobclickAgent.setScenarioType(this, EScenarioType.E_DUM_NORMAL);
        //PushAgent.getInstance(this).onAppStart();PushAgent.getInstance(this).onAppStart();
    }


    @Override
    public void onCreate(@Nullable Bundle savedInstanceState, @Nullable PersistableBundle persistentState) {
        super.onCreate(savedInstanceState, persistentState);
    }

    @Override
    protected void onStop() {
        super.onStop();

    }

    @Override
    protected void onResume() {
        super.onResume();
        MobclickAgent.onResume(this);

    }

    @Override
    public void onPause() {
        super.onPause();
        MobclickAgent.onPause(this);
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        UMShareAPI.get(this).onActivityResult(requestCode, resultCode, data);
    }
}
