package com.anjie.sixty.module;

import android.os.Build;
import android.support.annotation.RequiresApi;
import android.util.Log;

import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

/**
 * Created by aj on 2017/10/9.
 */

public class PLVideoTextureViewManager extends SimpleViewManager<PLVideoFrameLayout> implements LifecycleEventListener {
    protected static final String REACT_CLASS = "PLVideoTextureView";
    private static final String TAG = PLVideoTextureViewManager.class.getSimpleName();

    private static final int COMMAND_PAUSE_ID = 1;
    private static final String COMMAND_PAUSE_NAME = "pause";

    private static final int COMMAND_START_ID = 2;
    private static final String COMMAND_START_NAME = "start";

    private static final int COMMAND_SEEK_TO_ID = 3;
    private static final String COMMAND_SEEK_TO_NAME = "seekTo";

    private static final int COMMAND_MUTE_ID = 4;
    private static final String COMMAND_MUTE_NAME = "mute";

    private static final int COMMAND_UNMUTE_ID = 5;
    private static final String COMMAND_UNMUTE_NAME = "unmute";

    private static final int COMMAND_STOP_ID = 6;
    private static final String COMMAND_STOP_NAME = "stop";

    private static final int COMMAND_RESET_ID = 7;
    private static final String COMMAND_RESET_NAME = "reset";

    //private Boolean isLooping=false;
    //private float volume=1f;

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @RequiresApi(api = Build.VERSION_CODES.JELLY_BEAN_MR1)
    @Override
    protected PLVideoFrameLayout createViewInstance(ThemedReactContext reactContext) {
        reactContext.addLifecycleEventListener(this);
        return new PLVideoFrameLayout(reactContext);
    }

    @Override
    public void onDropViewInstance(PLVideoFrameLayout view) {
        super.onDropViewInstance(view);
        ((ThemedReactContext) view.getContext()).removeLifecycleEventListener(view);
        //view.stopPlayback();
    }


    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    @ReactProp(name = "source")
    public void setSource(PLVideoFrameLayout view,@Nullable ReadableMap source){
        if(source != null){
            if (source.hasKey("url")) {
                String url = source.getString("url");
                Log.e(TAG,"url = "+url);
                HashMap<String, String> headerMap = new HashMap<>();
                if (source.hasKey("headers")) {
                    ReadableMap headers = source.getMap("headers");
                    ReadableMapKeySetIterator iter = headers.keySetIterator();
                    while (iter.hasNextKey()) {
                        String key = iter.nextKey();
                        String value = headers.getString(key);
                        Log.e(TAG,key+" = "+value);
                        headerMap.put(key,value);
                    }
                }

                boolean isLooping=false;
                if (source.hasKey("looping")) {
                    isLooping=source.getBoolean("looping");
                    Log.e(TAG,"looping = "+isLooping);
                    view.setLooping(isLooping);
                }

                float volume=1.0f;
                if (source.hasKey("volume")) {
                    volume= (float) source.getDouble("volume");
                    view.setVolume(volume, 1.0f);
                }

                view.setVideoPath(url,headerMap);


                if(source.hasKey("coverurl")){
                    String _url1=source.getString("coverurl");
                        Log.e(TAG,"url1 = "+_url1);
                    if(_url1!=null){
                        view.setCoverImageUrl(_url1);
                    }
                }

                if(source.hasKey("bufferurl")){
                    String _url2=source.getString("bufferurl");
                    Log.e(TAG,"url2 = "+_url2);
                    if(_url2!=null){
                        view.setLoadingImage(_url2);
                    }
                }

                //自动播放
                boolean autoplay=false;
                if (source.hasKey("autoplay")) {
                    autoplay=source.hasKey("autoplay");
                    Log.e(TAG,"autoplay = "+autoplay);
                    if(autoplay) {
                        //view.setAutoPlay(true);
                        view.start();
                    }
                }

            }
        }
    }

    //----------接收js命令------------------
    @Nullable
    @Override
    public Map<String, Integer> getCommandsMap() {
        return MapBuilder.of(
                COMMAND_PAUSE_NAME,COMMAND_PAUSE_ID,
                COMMAND_START_NAME,COMMAND_START_ID,
                COMMAND_SEEK_TO_NAME, COMMAND_SEEK_TO_ID,
                COMMAND_MUTE_NAME, COMMAND_MUTE_ID,
                COMMAND_UNMUTE_NAME, COMMAND_UNMUTE_ID,
                COMMAND_STOP_NAME,COMMAND_STOP_ID,
                COMMAND_RESET_NAME,COMMAND_RESET_ID
        );
    }

    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    @Override
    public void receiveCommand(PLVideoFrameLayout root, int commandId, @Nullable ReadableArray args) {
        Log.e(TAG,"receiveCommand id = "+commandId);
        switch (commandId){
            case COMMAND_PAUSE_ID://暂停
                root.videoPause();
                break;
            case COMMAND_START_ID://开始
                root.start();
                break;
            case COMMAND_SEEK_TO_ID://快进
                if(args != null) {
                    int msec = args.getInt(0);
                    root.seekTo(msec);
                }
                break;
            case COMMAND_MUTE_ID://静音
                root.setVolume(0.0f, 0.0f);
                break;
            case COMMAND_UNMUTE_ID://最大音量
                if(args != null) {
                    float msec = (float) args.getDouble(0);
                    root.setVolume(msec, 1.0f);
                }else{
                    root.setVolume(1.0f, 1.0f);
                }
                break;
            case COMMAND_STOP_ID:
                Log.e(TAG,"COMMAND_STOP_ID");
                root.stopPlayback();

                break;
            case COMMAND_RESET_ID:
                try {
                    String url=args.getString(0);
                    String img=args.getString(1);
                    if(img!=null){
                        root.setCoverImageUrl(img);
                    }
                    if(url!=null){
                        root.setVideoPath(url);
                        root.start();
                    }
                }catch (Error e){
                    Log.e(TAG,e.toString());
                }

                break;
            default:
                break;
        }
    }

    //----------接收js命令------------------

    //----------回调js命令------------------
    @Nullable
    @Override
    public Map<String, Object> getExportedCustomDirectEventTypeConstants() {
        MapBuilder.Builder<String, Object> builder = MapBuilder.builder();
        for (PLVideoFrameLayout.VideoEvent event: PLVideoFrameLayout.VideoEvent.values()){
            builder.put(event.toString(),MapBuilder.of("registrationName", event.toString()));
        }
        return builder.build();
    }

    @Override
    public void onHostResume() {
        Log.e(TAG,"onHostResume");
    }

    @Override
    public void onHostPause() {
        Log.e(TAG,"onHostPause");
    }

    @Override
    public void onHostDestroy() {
        Log.e(TAG,"onHostDestroy");
    }
}
