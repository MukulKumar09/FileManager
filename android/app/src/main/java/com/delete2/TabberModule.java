package com.tabber;
import android.content.ContentResolver;
import android.database.Cursor;
import android.net.Uri;
import android.os.Build;
import android.provider.MediaStore;
import android.provider.MediaStore.Images.Thumbnails;
import androidx.annotation.NonNull;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import java.util.ArrayList;
import java.util.List;



public class TabberModule extends ReactContextBaseJavaModule {

    public TabberModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "TabberModule";
    }

    @ReactMethod
    public void getMountingPoints(String path,Callback successCallback, Callback errorCallback) {
        try{
            ContentResolver contentResolver = getReactApplicationContext().getContentResolver();
            Uri imageUri = MediaStore.Files.getContentUri("external");
            String selection = MediaStore.MediaColumns.DATA + " = '"+path+"'";
            Cursor cursor = contentResolver.query(imageUri, null,selection, null,null);
            cursor.moveToFirst();
            int idColumn = cursor.getColumnIndex(MediaStore.Files.FileColumns._ID);
            long id = cursor.getLong(idColumn);
            cursor.close();
            successCallback.invoke(String.valueOf(id));
        }catch (Exception e) {
            errorCallback.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void getAllFiles(int folderId,Callback successCallback, Callback errorCallback) {
        try {
            ContentResolver contentResolver = getReactApplicationContext().getContentResolver();
            // Uri imageUri = MediaStore.Images.Media.EXTERNAL_CONTENT_URI;
            Uri imageUri = MediaStore.Files.getContentUri("external");
            List<WritableMap> imagesList = new ArrayList<>();

            // Query the MediaStore for images
            // String selection = MediaStore.MediaColumns.DATA + " = '/storage/emulated/0'";
            String selection = MediaStore.Files.FileColumns.PARENT + " = '"+folderId+"'";
            // String[] selectionArgs = new String[]{folderId }; 
            Cursor cursor = contentResolver.query(imageUri, null,selection, null,null);

            if (cursor != null) {
                int idColumn = cursor.getColumnIndex(MediaStore.Files.FileColumns._ID);
                int titleColumn = cursor.getColumnIndex(MediaStore.Files.FileColumns.TITLE);
                int nameColumn = cursor.getColumnIndex(MediaStore.Files.FileColumns.DISPLAY_NAME);
                int pathColumn = cursor.getColumnIndex(MediaStore.Files.FileColumns.DATA);
                int mimeTypeColumn = cursor.getColumnIndex(MediaStore.Files.FileColumns.MIME_TYPE);
                int parentColumn = cursor.getColumnIndex(MediaStore.Files.FileColumns.PARENT);

                while (cursor.moveToNext()) {
                    WritableMap image = Arguments.createMap();
                    long id = cursor.getLong(idColumn);
                    String title = cursor.getString(titleColumn);
                    String name = cursor.getString(nameColumn);
                    String path = cursor.getString(pathColumn);
                    String mimeType = cursor.getString(mimeTypeColumn);
                    String parent = cursor.getString(parentColumn);
                    image.putString("id", String.valueOf(id));
                    image.putString("title", title);
                    image.putString("name", name);
                    image.putString("path", path);
                    image.putString("mimeType", mimeType);
                    image.putString("parent", parent);
                    imagesList.add(image);
                }
                cursor.close();
            }

            // Return the list of images to React Native
            WritableArray imagesArray = Arguments.createArray();
            for (WritableMap image : imagesList) {
                imagesArray.pushMap(image);
            }
            successCallback.invoke(imagesArray);
        } catch (Exception e) {
            errorCallback.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void getMedia(String mediaType,Callback successCallback, Callback errorCallback){
        try {
            ContentResolver contentResolver = getReactApplicationContext().getContentResolver();

            Uri mediaUri=null;
            if(mediaType.equals("Photos")){
                mediaUri=MediaStore.Images.Media.EXTERNAL_CONTENT_URI;
            }else if(mediaType.equals("Videos")){
                mediaUri=MediaStore.Video.Media.EXTERNAL_CONTENT_URI;
            }else if(mediaType.equals("Audio")){
                mediaUri=MediaStore.Audio.Media.EXTERNAL_CONTENT_URI;
            }
            else if(mediaType.equals("Downloads")){
                mediaUri=MediaStore.Downloads.EXTERNAL_CONTENT_URI;
            }
            Cursor cursor = contentResolver.query(mediaUri, null,null, null,null);
            
            List<WritableMap> mediaList = new ArrayList<>();
            if (cursor != null) {
                int idColumn = cursor.getColumnIndex(MediaStore.MediaColumns._ID);
                int titleColumn = cursor.getColumnIndex(MediaStore.MediaColumns.TITLE);
                int nameColumn = cursor.getColumnIndex(MediaStore.MediaColumns.DISPLAY_NAME);
                int pathColumn = cursor.getColumnIndex(MediaStore.MediaColumns.DATA);
                int mimeTypeColumn = cursor.getColumnIndex(MediaStore.MediaColumns.MIME_TYPE);

                while (cursor.moveToNext()) {
                    WritableMap mediaMap = Arguments.createMap();

                    long id = cursor.getLong(idColumn);
                    mediaMap.putString("id", String.valueOf(id));

                    String title = cursor.getString(titleColumn);
                    mediaMap.putString("title", title);

                    String name = cursor.getString(nameColumn);
                    mediaMap.putString("name", name);

                    String path = cursor.getString(pathColumn);
                    mediaMap.putString("path", path);

                    String mimeType = cursor.getString(mimeTypeColumn);
                    mediaMap.putString("mimeType", mimeType);

                    int lastSlashIndex = path.lastIndexOf("/");
                    String parent = path.substring(0, lastSlashIndex);
                    mediaMap.putString("parent", parent);
                    
                    mediaList.add(mediaMap);
                }
                cursor.close();
            }

            // Return the list of images to React Native
            WritableArray finalArray = Arguments.createArray();
            for (WritableMap media : mediaList) {
                finalArray.pushMap(media);
            }
            successCallback.invoke(finalArray);
        } catch (Exception e) {
            errorCallback.invoke(e.getMessage());
        }
    }
}