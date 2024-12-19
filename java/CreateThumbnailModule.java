package com.reactlibrary.createthumbnail;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.media.MediaMetadataRetriever;
import android.net.Uri;
import android.os.Build;
import android.os.Build.VERSION;
import android.os.Environment;
import android.text.TextUtils;
import android.webkit.URLUtil;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.GuardedResultAsyncTask;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;

import org.apache.commons.io.comparator.LastModifiedFileComparator;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.lang.ref.WeakReference;
import java.net.URLDecoder;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;


public class CreateThumbnailModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public CreateThumbnailModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "CreateThumbnail";
    }

    @ReactMethod
    public void create(ReadableMap options, Promise promise) {
        new ProcessDataTask(reactContext, promise, options).execute();
    }

    private static class ProcessDataTask extends GuardedResultAsyncTask<String> {
        private final WeakReference<Context> weakContext;
        private final Promise promise;
        private final ReadableMap options;

        protected ProcessDataTask(ReactContext reactContext, Promise promise, ReadableMap options) {
            super(reactContext.getExceptionHandler());
            this.weakContext = new WeakReference<>(reactContext.getApplicationContext());
            this.promise = promise;
            this.options = options;
        }

        @Override
        protected String doInBackgroundGuarded() {
            //extract data
            //replicate filepath in cache
            String fileParent=options.getString("parent");
            String thumbnailDir = weakContext.get().getExternalFilesDir(null)+ "/thumbnails"+fileParent;
            File cacheDir = createDirIfNotExists(thumbnailDir);
            String fileName=options.getString("name");
            String ext = options.getString("ext").equals("png")?"png":"jpg";
            String fileToSave=fileName+"."+ext;
            File file = new File(cacheDir, fileToSave);
            if (file.exists()) {
                return "icon exists";
            }else{
            String fileUrl=options.getString("path");
            String filePath ="file://" +fileUrl;
            String mediaType = options.getString("mediaType");

            
            //initialize defaults
            int dirSize = 100;
            int timeStamp = 1000;
            int maxWidth = 512;
            int maxHeight = 512;
            boolean onlySyncedFrames =true;
            HashMap headers = new HashMap<String, String>();
            OutputStream fOut = null;
            
            try {
                Context context = weakContext.get();
                Bitmap image=null;
                if(mediaType.equals("video")){
                    image = getVideoBitmapAtTime(context, filePath, timeStamp, maxWidth, maxHeight, onlySyncedFrames, headers);
                }
                else if(mediaType.equals("image")){
                    String newPath = filePath.replace("file://", "");
                    Bitmap inputBitmap = BitmapFactory.decodeFile(newPath);

                    int width = inputBitmap.getWidth();
                    int height = inputBitmap.getHeight();
                    float ratioBitmap = (float) width / (float) height;
                    int finalWidth = 50;
                    int finalHeight = 50;
                    if (1 > ratioBitmap) {
                        finalWidth = (int) ((float)50 * ratioBitmap);
                    } else {
                        finalHeight = (int) ((float)50 / ratioBitmap);
                    }

                    image = Bitmap.createScaledBitmap(inputBitmap, finalWidth,finalHeight, true);
                }
                
                if(image==null){
                    return "failed";
                } else {
                    file.createNewFile();
                    fOut = new FileOutputStream(file);

                    // 100 means no compression, the lower you go, the stronger the compression
                    if (ext.equals("png")) {
                        image.compress(Bitmap.CompressFormat.PNG, 100, fOut);
                    } else {
                        image.compress(Bitmap.CompressFormat.JPEG, 90, fOut);
                    }

                    fOut.flush();
                    fOut.close();

                    long cacheDirSize = (long) dirSize * 1024 * 1024;
                    long newSize = image.getByteCount() + getDirSize(cacheDir);
                    // free up some cached data if size of cache dir exceeds CACHE_DIR_MAX_SIZE
                    if (newSize > cacheDirSize) {
                        cleanDir(cacheDir, cacheDirSize / 2);
                    }
                }
            } catch (Exception e) {
                return "failed";
                // promise.reject("CreateThumbnail_ERROR", e);
            }
            return "success";
            }
        }

        @Override
        protected void onPostExecuteGuarded(String result) {
            promise.resolve(result);
        }
    }

    // delete previously added files one by one untill requred space is available
    private static void cleanDir(File dir, long bytes) {
        long bytesDeleted = 0;
        File[] files = dir.listFiles();
        Arrays.sort(files, LastModifiedFileComparator.LASTMODIFIED_COMPARATOR);

        for (File file : files) {
            bytesDeleted += file.length();
            file.delete();

            if (bytesDeleted >= bytes) {
                break;
            }
        }
    }

    private static File createDirIfNotExists(String path) {
        File dir = new File(path);
        if (dir.exists()) {
            return dir;
        }

        try {
            dir.mkdirs();
            // Add .nomedia to hide the thumbnail directory from gallery
            File noMedia = new File(path, ".nomedia");
            noMedia.createNewFile();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return dir;
    }

    private static Bitmap getVideoBitmapAtTime(Context context, String filePath, int time, int maxWidth, int maxHeight, boolean onlySyncedFrames, Map headers) throws IOException, IllegalStateException {
        MediaMetadataRetriever retriever = new MediaMetadataRetriever();
        if (URLUtil.isFileUrl(filePath)) {
            String decodedPath;
            try {
                decodedPath = URLDecoder.decode(filePath, "UTF-8");
            } catch (UnsupportedEncodingException e) {
                decodedPath = filePath;
            }

            retriever.setDataSource(decodedPath.replace("file://", ""));
        } else if (filePath.contains("content://")) {
            retriever.setDataSource(context, Uri.parse(filePath));
        } else {
            if (VERSION.SDK_INT < 14) {
                throw new IllegalStateException("Remote videos aren't supported on sdk_version < 14");
            }
            retriever.setDataSource(filePath, headers);
        }

        Bitmap image;
        if (Build.VERSION.SDK_INT >= 27) {
            image = retriever.getScaledFrameAtTime(time * 1000, MediaMetadataRetriever.OPTION_CLOSEST_SYNC, maxWidth, maxHeight);
        } else {
            // If on versions lower than API 27, use other methods to get frames
            image = retriever.getFrameAtTime(time * 1000, MediaMetadataRetriever.OPTION_CLOSEST_SYNC);
            if (image != null) {
                image = Bitmap.createScaledBitmap(image, maxWidth, maxHeight, true);
            }
        }
        try {
            retriever.release();
        } catch(IOException e) {
            e.printStackTrace();
        }
        return image;
    }

    private static long getDirSize(File dir) {
        long size = 0;
        File[] files = dir.listFiles();

        for (File file : files) {
            if (file.isFile()) {
                size += file.length();
            }
        }

        return size;
    }
}
