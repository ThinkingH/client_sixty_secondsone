package com.anjie.sixty.utils;

/**
 * Created by aj on 2017/12/4.
 */
import android.os.Environment;

public class Config {
    public static final String SDCARD_DIR = Environment.getExternalStorageDirectory().getAbsolutePath();
    public static final String DEFAULT_CACHE_DIR = SDCARD_DIR + "/PLDroidPlayer";
}
