package com.anjie.sixty.module;

import android.content.Context;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Build;
import android.os.Handler;
import android.support.annotation.AttrRes;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.annotation.RequiresApi;
import android.util.AttributeSet;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.FrameLayout;

import com.anjie.sixty.R;
import com.facebook.drawee.view.SimpleDraweeView;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.pili.pldroid.player.PLMediaPlayer;
import com.sprylab.android.widget.TextureVideoView;

import java.util.HashMap;

/**
 * Created by aj on 2017/11/5.
 */

public class VideoViewFrameLayout extends FrameLayout implements LifecycleEventListener,
        MediaPlayer.OnPreparedListener,
        MediaPlayer.OnCompletionListener,
        MediaPlayer.OnErrorListener,
        MediaPlayer.OnInfoListener,
        MediaPlayer.OnSeekCompleteListener,
        MediaPlayer.OnBufferingUpdateListener,Runnable{

    private SimpleDraweeView coverView;
    private View loadingView;
    private TextureVideoView mVideoView;
    private Handler mHandler;
    private static final String TAG = VideoViewFrameLayout.class.getSimpleName();
    private boolean isAutoPlay=false;
    //暂时存储
    private boolean isLooping=false;
    private MediaPlayer mMediaPlayer;
    private float isVolume=1.0f;
    private boolean isPause=false;

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


    @RequiresApi(api = Build.VERSION_CODES.JELLY_BEAN_MR1)
    public VideoViewFrameLayout(@NonNull Context context) {
        super(context);
        LayoutInflater.from(context).inflate(R.layout.pl_video_texture, this, true);

        mVideoView = (TextureVideoView) findViewById(R.id.VideoView);

        loadingView = findViewById(R.id.LoadingView);
        loadingView.setVisibility(View.VISIBLE);
        //mVideoView.setBufferingIndicator(loadingView);

        coverView = (SimpleDraweeView) findViewById(R.id.CoverView);
        //mVideoView.setCoverView(coverView);

        ThemedReactContext reactContext= (ThemedReactContext) context;
        reactContext.addLifecycleEventListener(this);

        //AVOptions options = new AVOptions();
        // the unit of timeout is ms
        //options.setInteger(AVOptions.KEY_PREPARE_TIMEOUT, 10 * 1000);
        //options.setInteger(AVOptions.KEY_LIVE_STREAMING, mIsLiveStreaming ? 1 : 0);
        // 1 -> hw codec enable, 0 -> disable [recommended]
        //options.setInteger(AVOptions.KEY_MEDIACODEC, AVOptions.MEDIA_CODEC_SW_DECODE);

        //mVideoView.setAVOptions(options);
        //mVideoView.setDebugLoggingEnabled(true);

        mVideoView.setOnPreparedListener(this);
        mVideoView.setOnInfoListener(this);

        //mVideoView.setOnBufferingUpdateListener(this);
        mVideoView.setOnCompletionListener(this);
        mVideoView.setOnErrorListener(this);

        mHandler = new Handler();

    }

    public VideoViewFrameLayout(@NonNull Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);

    }

    public VideoViewFrameLayout(@NonNull Context context, @Nullable AttributeSet attrs, @AttrRes int defStyleAttr) {
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
        mHandler.removeCallbacks(this);
    }

    @Override
    public void onPrepared(MediaPlayer plMediaPlayer) {
        mMediaPlayer=plMediaPlayer;
        mMediaPlayer.setOnSeekCompleteListener(this);


        long duration = plMediaPlayer.getDuration();
        Log.e(TAG,"onPrepared duration = "+duration);
        plMediaPlayer.setOnInfoListener(this);
        plMediaPlayer.setOnBufferingUpdateListener(this);
        setLooping(isLooping);
        setVolume(isVolume,1.0f);

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
    public void onCompletion(MediaPlayer plMediaPlayer) {
        dispatchEvent(VideoEvent.EVENT_COMPLETION.toString(),null);
        mHandler.removeCallbacks(this);

        long progress=mVideoView.getDuration();
        WritableMap event = Arguments.createMap();
        event.putDouble("progress",progress);
        dispatchEvent(VideoEvent.EVENT_PROGRESS.toString(),event);
    }

    @Override
    public boolean onError(MediaPlayer mp, int errorCode,int extra) {
        Log.e(TAG, "Error happened, errorCode = " + errorCode);
        mHandler.removeCallbacks(this);
        WritableMap event = Arguments.createMap();
        event.putInt("what",errorCode);
        switch (errorCode) {
            case PLMediaPlayer.ERROR_CODE_IO_ERROR:
                /**
                 * SDK will do reconnecting automatically
                 */
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
    public boolean onInfo(MediaPlayer plMediaPlayer, int what, int extra) {
        Log.e(TAG, "onInfo, what = " + what + ", extra = " + extra);

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
                //Log.i(TAG, plMediaPlayer.getMetadata().toString());
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

    private void updateStatInfo(MediaPlayer plMediaPlayer) {
        //long bitrate = plMediaPlayer.getVideoBitrate() / 1024;
        //final String stat = bitrate + "kbps, " + plMediaPlayer.getVideoFps() + "fps";
    }

    @Override
    public void onBufferingUpdate(MediaPlayer plMediaPlayer, int percent) {
        Log.i(TAG, "onBufferingUpdate: " + percent);

        int buffer = (int) Math.round((double) (plMediaPlayer.getDuration() * percent) / 100.0);
        WritableMap event = Arguments.createMap();
        event.putInt("buffer",buffer);
        dispatchEvent(VideoEvent.EVENT_UPDATE.toString(),event);
    }

    private void dispatchEvent(String eventName,WritableMap eventData){
        ReactContext reactContext = (ReactContext) getContext();
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                getId(),//native和js两个视图会依据getId()而关联在一起
                eventName,//事件名称
                eventData
        );
    }

    @Override
    public void run() {
        long progress = mVideoView.getCurrentPosition();
        WritableMap event = Arguments.createMap();
        event.putDouble("progress",progress);
        dispatchEvent(VideoEvent.EVENT_PROGRESS.toString(),event);
        mHandler.postDelayed(this,1000);
    }

    //---------------------------------

    public void stopPlayback(){
        mVideoView.stopPlayback();
    }

    public void setLooping(Boolean flag){
        //mVideoView.setLooping(flag);
        isLooping=flag;
        if(mMediaPlayer==null){
            return;
        }
        mMediaPlayer.setLooping(flag);
    }

    public void setVolume(float i,float max){
        //mVideoView.setVolume(i,max);
        isVolume=i;
        if(mMediaPlayer==null){
            return;
        }
        mMediaPlayer.setVolume(i,max);
    }

    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    public void setVideoPath(String url, HashMap<String, String> headerMap){
        //mVideoView.setVideoPath(url,headerMap);
        //String _url="http://bmob-cdn-7694.b0.upaiyun.com/2016/12/08/a6bf44c940d580cf809893f8131396c4.mp4";
        try {
            mVideoView.stopPlayback();
            mVideoView.setVideoURI(Uri.parse(url),headerMap);
        }catch (Error e){

        }
    }

    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    public void setVideoPath(String url){
        //mVideoView.setVideoPath(url,headerMap);
        //String _url="http://bmob-cdn-7694.b0.upaiyun.com/2016/12/08/a6bf44c940d580cf809893f8131396c4.mp4";
        try {
            mVideoView.stopPlayback();
            mVideoView.setVideoURI(Uri.parse(url));
        }catch (Error e){

        }
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
        //mVideoView.pause();
        isPause=true;
        mVideoView.pause();
        mVideoView.seekTo(msec);
    }

    public void setAutoPlay(boolean flag){
        isAutoPlay=flag;
    }

    @Override
    public void onSeekComplete(MediaPlayer mp) {
        if(isPause){
            mVideoView.start();
            isPause = false;
        }
    }
    //---------------------------------

}
