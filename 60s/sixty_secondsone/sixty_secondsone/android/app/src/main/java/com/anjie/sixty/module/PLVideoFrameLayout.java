package com.anjie.sixty.module;

import android.content.Context;
import android.net.Uri;
import android.os.Handler;
import android.support.annotation.AttrRes;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.util.AttributeSet;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.FrameLayout;

import com.anjie.sixty.R;
import com.anjie.sixty.utils.Config;
import com.facebook.drawee.view.SimpleDraweeView;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.pili.pldroid.player.AVOptions;
import com.pili.pldroid.player.PLMediaPlayer;
import com.pili.pldroid.player.widget.PLVideoTextureView;


import java.util.HashMap;


/**
 * Created by aj on 2017/11/5.
 */

public class PLVideoFrameLayout extends FrameLayout implements LifecycleEventListener{

    private SimpleDraweeView coverView;
    private View loadingView;
    private PLVideoTextureView mVideoView;
    private Handler mHandler;
    private static final String TAG = PLVideoFrameLayout.class.getSimpleName();
    private boolean isAutoPlay=false;
    private boolean mIsLiveStreaming=false;
    private boolean isSeeking=false;
    private boolean isCompletion=false;

    public enum VideoEvent{
        EVENT_PREPARE("onPrepared"),
        EVENT_PROGRESS("onProgress"),
        EVENT_UPDATE("onBufferUpdate"),
        EVENT_ERROR("onPLVideoViewError"),
        EVENT_COMPLETION("onCompletion");

        private String mName;
        VideoEvent(String name) {
            this.mName = name;
        }

        @Override
        public String toString() {
            return mName;
        }
    }


    public PLVideoFrameLayout(@NonNull Context context) {
        super(context);
        LayoutInflater.from(context).inflate(R.layout.pl_video_texture, this, true);

        mVideoView = (PLVideoTextureView) findViewById(R.id.VideoView);

        loadingView = findViewById(R.id.LoadingView);
        loadingView.setVisibility(View.VISIBLE);
        mVideoView.setBufferingIndicator(loadingView);

        coverView = (SimpleDraweeView) findViewById(R.id.CoverView);
        mVideoView.setCoverView(coverView);

        //ThemedReactContext reactContext= (ThemedReactContext) context;
        //reactContext.addLifecycleEventListener(this);

        int codec = AVOptions.MEDIA_CODEC_AUTO;
        AVOptions options = new AVOptions();
        options.setInteger(AVOptions.KEY_PREPARE_TIMEOUT, 10 * 1000);
        options.setInteger(AVOptions.KEY_LIVE_STREAMING, mIsLiveStreaming ? 1 : 0);
        // 1 -> hw codec enable, 0 -> disable [recommended]
        options.setInteger(AVOptions.KEY_MEDIACODEC, codec);
        boolean disableLog = false;
        options.setInteger(AVOptions.KEY_LOG_LEVEL, disableLog ? 5 : 0);
        boolean cache = false;
        if (!mIsLiveStreaming && cache) {
            options.setString(AVOptions.KEY_CACHE_DIR, Config.DEFAULT_CACHE_DIR);
        }
        mVideoView.setAVOptions(options);
        mVideoView.setDebugLoggingEnabled(false);


        //mediaController = new MediaController(context, !mIsLiveStreaming, mIsLiveStreaming);
        //mediaController.setOnClickSpeedAdjustListener(mOnClickSpeedAdjustListener);
        //mVideoView.setMediaController(mediaController);
        //mediaController.setOnProgressBack(mProgressBack);

        //mVideoView.setOnPreparedListener(mOnPreparedListener);
        //mVideoView.setOnSeekCompleteListener(mOnSeekCompleteListener);

        //mVideoView.setOnPreparedListener(this);
        //mVideoView.setOnInfoListener(this);
        //mVideoView.setOnBufferingUpdateListener(this);
        //mVideoView.setOnCompletionListener(this);
        //mVideoView.setOnErrorListener(this);

        mVideoView.setOnPreparedListener(mOnPreparedListener);
        mVideoView.setOnInfoListener(mOnInfoListener);
        mVideoView.setOnVideoSizeChangedListener(mOnVideoSizeChangedListener);
        mVideoView.setOnBufferingUpdateListener(mOnBufferingUpdateListener);
        mVideoView.setOnCompletionListener(mOnCompletionListener);
        mVideoView.setOnErrorListener(mOnErrorListener);
        mVideoView.setOnSeekCompleteListener(mOnSeekCompleteListener);


       /* if(isAutoPlay){
            mVideoView.start();
        }*/

        mHandler = new Handler();

    }

    public PLVideoFrameLayout(@NonNull Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);

    }

    public PLVideoFrameLayout(@NonNull Context context, @Nullable AttributeSet attrs, @AttrRes int defStyleAttr) {
        super(context, attrs, defStyleAttr);

    }


    @Override
    public void onHostResume() {
        Log.e(TAG,"onHostResume");
    }

    @Override
    public void onHostPause() {
        Log.e(TAG,"onHostPause");
        mVideoView.pause();
    }

    @Override
    public void onHostDestroy() {
        Log.e(TAG,"onHostDestroy");
    }
    /*@Override
    public void onPrepared(PLMediaPlayer plMediaPlayer, int i) {
        long duration = plMediaPlayer.getDuration();
        Log.e(TAG,"onPrepared duration = "+duration);
        plMediaPlayer.setOnInfoListener(this);
        plMediaPlayer.setOnBufferingUpdateListener(this);
        //向js发送事件
        WritableMap event = Arguments.createMap();
        event.putDouble("duration",duration);//key用于js中的nativeEvent
        dispatchEvent(VideoEvent.EVENT_PREPARE.toString(),event);
        mHandler.post(this);

        if(isAutoPlay){
            mVideoView.start();
        }
    }

    @Override
    public void onCompletion(PLMediaPlayer plMediaPlayer) {
        dispatchEvent(VideoEvent.EVENT_COMPLETION.toString(),null);
        mHandler.removeCallbacks(this);

        long progress=mVideoView.getDuration();
        WritableMap event = Arguments.createMap();
        event.putDouble("progress",progress);
        dispatchEvent(VideoEvent.EVENT_PROGRESS.toString(),event);
    }

    @Override
    public boolean onError(PLMediaPlayer mp, int errorCode) {
        Log.e(TAG, "Error happened, errorCode = " + errorCode);
        mHandler.removeCallbacks(this);
        WritableMap event = Arguments.createMap();
        event.putInt("what",errorCode);
        switch (errorCode) {
            case PLMediaPlayer.ERROR_CODE_IO_ERROR:
                Log.e(TAG, "IO Error!");
                event.putString("extra","IO Error!");

                return false;
            case PLMediaPlayer.ERROR_CODE_OPEN_FAILED:
                Log.e(TAG, "failed to open player !");
                event.putString("extra","failed to open player !");

                break;
            case PLMediaPlayer.ERROR_CODE_SEEK_FAILED:
                Log.e(TAG, "failed to seek !");
                event.putString("extra","failed to seek !");
                break;
            default:
                Log.e(TAG, "unknown error !");
                event.putString("extra","unknown error !");
                break;
        }
        dispatchEvent(VideoEvent.EVENT_ERROR.toString(),event);

        return true;
    }

    @Override
    public boolean onInfo(PLMediaPlayer plMediaPlayer, int what, int extra) {
        Log.i(TAG, "OnInfo, what = " + what + ", extra = " + extra);

        if(loadingView != null) {
            if(what == 702 || what == 10002 || what == 3) {
                loadingView.setVisibility(View.GONE);
            }
        }


        switch (what) {
            case PLMediaPlayer.MEDIA_INFO_BUFFERING_START:
                if(loadingView!=null){
                    loadingView.setVisibility(View.VISIBLE);
                }
                break;
            case PLMediaPlayer.MEDIA_INFO_BUFFERING_END:
                break;
            case PLMediaPlayer.MEDIA_INFO_VIDEO_RENDERING_START:
                if(coverView!=null){
                    coverView.setVisibility(View.GONE);
                }
                Log.i(TAG, "first video render time: " + extra + "ms");
                break;
            case PLMediaPlayer.MEDIA_INFO_AUDIO_RENDERING_START:
                break;
            case PLMediaPlayer.MEDIA_INFO_VIDEO_FRAME_RENDERING:
                Log.i(TAG, "video frame rendering, ts = " + extra);
                break;
            case PLMediaPlayer.MEDIA_INFO_AUDIO_FRAME_RENDERING:
                Log.i(TAG, "audio frame rendering, ts = " + extra);
                break;
            case PLMediaPlayer.MEDIA_INFO_VIDEO_GOP_TIME:
                Log.i(TAG, "Gop Time: " + extra);
                break;
            case PLMediaPlayer.MEDIA_INFO_SWITCHING_SW_DECODE:
                Log.i(TAG, "Hardware decoding failure, switching software decoding!");
                break;
            case PLMediaPlayer.MEDIA_INFO_METADATA:
                Log.i(TAG, plMediaPlayer.getMetadata().toString());
                break;
            case PLMediaPlayer.MEDIA_INFO_VIDEO_BITRATE:
            case PLMediaPlayer.MEDIA_INFO_VIDEO_FPS:
                updateStatInfo(plMediaPlayer);
                break;
            case PLMediaPlayer.MEDIA_INFO_CONNECTED:
                Log.i(TAG, "Connected !");
                break;
            default:
                break;
        }
        return true;
    }

    private void updateStatInfo(PLMediaPlayer plMediaPlayer) {
        long bitrate = plMediaPlayer.getVideoBitrate() / 1024;
        final String stat = bitrate + "kbps, " + plMediaPlayer.getVideoFps() + "fps";
    }

    @Override
    public void onBufferingUpdate(PLMediaPlayer plMediaPlayer, int percent) {
        Log.i(TAG, "onBufferingUpdate: " + percent);

        int buffer = (int) Math.round((double) (plMediaPlayer.getDuration() * percent) / 100.0);
        WritableMap event = Arguments.createMap();
        event.putInt("buffer",buffer);
        dispatchEvent(VideoEvent.EVENT_UPDATE.toString(),event);
    }*/

    private void dispatchEvent(String eventName,WritableMap eventData){
        ReactContext reactContext = (ReactContext) getContext();
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                getId(),//native和js两个视图会依据getId()而关联在一起
                eventName,//事件名称
                eventData
        );
    }
    /*
    @Override
    public void run() {
        long progress = mVideoView.getCurrentPosition();
        WritableMap event = Arguments.createMap();
        event.putDouble("progress",progress);
        dispatchEvent(VideoEvent.EVENT_PROGRESS.toString(),event);
        mHandler.postDelayed(this,1000);
    }*/

    //---------------------------------

    public void stopPlayback(){
        try {
            videoPause();
            new Thread(new Runnable() {
                @Override
                public void run() {
                    mVideoView.stopPlayback();
                    mHandler.removeCallbacks(mRunnable);
                }
            }).start();

        }catch (Exception e){
            Log.e(TAG,e.getMessage());
        }
    }

    public void setLooping(Boolean flag){
        mVideoView.setLooping(flag);
    }

    public void setVolume(float i,float max){
        mVideoView.setVolume(i,max);
    }

    public void setVideoPath(String url,HashMap<String, String> headerMap){
        mVideoView.setVideoPath(url,headerMap);
    }

    public void setVideoPath(String url){
        mVideoView.setVideoPath(url);
    }

    public void setCoverImageUrl(String url){
        coverView.setVisibility(VISIBLE);
        coverView.setImageURI(Uri.parse(url));
    }

    public void setLoadingImage(String url){

    }

    public void start(){
        mVideoView.start();
    }


    public void videoPause() {
            mVideoView.pause();
    }

    public void seekTo(int msec) {
        try {
           Log.e(TAG,"seekTo---------"+msec);
            isSeeking=true;
            mVideoView.seekTo(msec);
        }catch (Exception e){
            Log.e(TAG,e.getMessage());
        }
    }

    public void setAutoPlay(boolean flag){
        isAutoPlay=flag;
    }

    //---------------------------------

    private PLMediaPlayer.OnInfoListener mOnInfoListener = new PLMediaPlayer.OnInfoListener() {
        @Override
        public boolean onInfo(PLMediaPlayer plMediaPlayer, int what, int extra) {
            /*Log.i(TAG, "OnInfo, what = " + what + ", extra = " + extra);
            switch (what) {
                case PLMediaPlayer.MEDIA_INFO_BUFFERING_START:
                    break;
                case PLMediaPlayer.MEDIA_INFO_BUFFERING_END:
                    break;
                case PLMediaPlayer.MEDIA_INFO_VIDEO_RENDERING_START:
                    showToastTips("First video render time: " + extra + "ms");
                    break;
                case PLMediaPlayer.MEDIA_INFO_AUDIO_RENDERING_START:
                    Log.i(TAG, "First audio render time: " + extra + "ms");
                    break;
                case PLMediaPlayer.MEDIA_INFO_VIDEO_FRAME_RENDERING:
                    Log.i(TAG, "video frame rendering, ts = " + extra);
                    break;
                case PLMediaPlayer.MEDIA_INFO_AUDIO_FRAME_RENDERING:
                    Log.i(TAG, "audio frame rendering, ts = " + extra);
                    break;
                case PLMediaPlayer.MEDIA_INFO_VIDEO_GOP_TIME:
                    Log.i(TAG, "Gop Time: " + extra);
                    break;
                case PLMediaPlayer.MEDIA_INFO_SWITCHING_SW_DECODE:
                    Log.i(TAG, "Hardware decoding failure, switching software decoding!");
                    break;
                case PLMediaPlayer.MEDIA_INFO_METADATA:
                    Log.i(TAG, mVideoView.getMetadata().toString());
                    break;
                case PLMediaPlayer.MEDIA_INFO_VIDEO_BITRATE:
                case PLMediaPlayer.MEDIA_INFO_VIDEO_FPS:
                    updateStatInfo();
                    break;
                case PLMediaPlayer.MEDIA_INFO_CONNECTED:
                    Log.i(TAG, "Connected !");
                    break;
                default:
                    break;
            }*/
            return true;
        }
    };

    private PLMediaPlayer.OnErrorListener mOnErrorListener = new PLMediaPlayer.OnErrorListener() {
        @Override
        public boolean onError(PLMediaPlayer mp, int errorCode) {
            Log.e(TAG, "Error happened, errorCode = " + errorCode);
            mHandler.removeCallbacks(mRunnable);
            WritableMap event = Arguments.createMap();
            event.putInt("what",errorCode);
            switch (errorCode) {
                case PLMediaPlayer.ERROR_CODE_IO_ERROR:
                    /**
                     * SDK will do reconnecting automatically
                     */
                    showToastTips("IO Error !");
                    return false;
                case PLMediaPlayer.ERROR_CODE_OPEN_FAILED:
                    showToastTips("failed to open player !");
                    break;
                case PLMediaPlayer.ERROR_CODE_SEEK_FAILED:
                    showToastTips("failed to seek !");
                    break;
                default:
                    showToastTips("unknown error !");
                    break;
            }
            return true;
        }
    };

    private PLMediaPlayer.OnCompletionListener mOnCompletionListener = new PLMediaPlayer.OnCompletionListener() {
        @Override
        public void onCompletion(PLMediaPlayer plMediaPlayer) {
            Log.i(TAG, "Play Completed !");
            dispatchEvent(VideoEvent.EVENT_COMPLETION.toString(),null);
            mHandler.removeCallbacks(mRunnable);

            isCompletion=true;

            long progress=mVideoView.getDuration();
            WritableMap event = Arguments.createMap();
            event.putDouble("progress",progress);
            dispatchEvent(VideoEvent.EVENT_PROGRESS.toString(),event);
        }
    };

    private PLMediaPlayer.OnBufferingUpdateListener mOnBufferingUpdateListener = new PLMediaPlayer.OnBufferingUpdateListener() {
        @Override
        public void onBufferingUpdate(PLMediaPlayer plMediaPlayer, int precent) {
            Log.i(TAG, "onBufferingUpdate: " + precent);

            int buffer = (int) Math.round((double) (plMediaPlayer.getDuration() * precent) / 100.0);
            WritableMap event = Arguments.createMap();
            event.putInt("buffer",buffer);
            dispatchEvent(VideoEvent.EVENT_UPDATE.toString(),event);
        }
    };

    private PLMediaPlayer.OnVideoSizeChangedListener mOnVideoSizeChangedListener = new PLMediaPlayer.OnVideoSizeChangedListener() {
        @Override
        public void onVideoSizeChanged(PLMediaPlayer plMediaPlayer, int width, int height) {
            Log.i(TAG, "onVideoSizeChanged: width = " + width + ", height = " + height);
        }
    };

    private PLMediaPlayer.OnPreparedListener mOnPreparedListener=new PLMediaPlayer.OnPreparedListener(){

        @Override
        public void onPrepared(PLMediaPlayer plMediaPlayer, int i) {
            long duration = plMediaPlayer.getDuration();
            Log.e(TAG,"onPrepared duration = "+duration);
            //向js发送事件
            WritableMap event = Arguments.createMap();
            event.putDouble("duration",duration);//key用于js中的nativeEvent
            dispatchEvent(VideoEvent.EVENT_PREPARE.toString(),event);
            mHandler.post(mRunnable);

        }
    };

    private PLMediaPlayer.OnSeekCompleteListener mOnSeekCompleteListener=new PLMediaPlayer.OnSeekCompleteListener() {
        @Override
        public void onSeekComplete(PLMediaPlayer plMediaPlayer) {
            isSeeking=false;
            Log.e(TAG,"onSeekComplete-------");
        }
    };

    private void showToastTips(final String tips) {

    }

    private void updateStatInfo() {
        long bitrate = mVideoView.getVideoBitrate() / 1024;
        final String stat = bitrate + "kbps, " + mVideoView.getVideoFps() + "fps";
    }

    private Runnable mRunnable=new Runnable() {
        @Override
        public void run() {
            if(!isSeeking){
                long progress = mVideoView.getCurrentPosition();
                WritableMap event = Arguments.createMap();
                event.putDouble("progress",progress);
                dispatchEvent(VideoEvent.EVENT_PROGRESS.toString(),event);
                Log.e(TAG,progress+"mRunnable----progress-----");
            }
            mHandler.postDelayed(mRunnable,1000);

        }
    };

}
